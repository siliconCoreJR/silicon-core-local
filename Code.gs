// ============================================================
// SILICONCORE — Push Product Data to Website
// ============================================================
// This Apps Script reads "Product data web" tab, builds a JSON
// payload, commits it to GitHub, and triggers the page-generation
// workflow.
//
// SETUP (one-time):
//   1. Open Extensions → Apps Script in this spreadsheet
//   2. Paste this entire file into Code.gs
//   3. Go to Project Settings → Script Properties
//   4. Add property: GITHUB_TOKEN  = <your GitHub Personal Access Token>
//      (Token needs "repo" scope — create at github.com/settings/tokens)
//   5. Run setupMenu() once, then reload the spreadsheet
//   6. You'll see a "SiliconCore Web" menu in the menu bar
// ============================================================

const REPO_OWNER = 'siliconCoreJR';
const REPO_NAME  = 'silicon-core-local';
const BRANCH     = 'main';
const FILE_PATH  = 'product_data.json';
const SHEET_NAME = 'Product data web';

// Expected column header names (must match your sheet's header row exactly, case-insensitive)
// The script maps these at runtime — column order in the sheet doesn't matter.
const EXPECTED_HEADERS = [
  'code',
  'product_name',
  'pitch',
  'taa',
  'indoor_outdoor',
  'brightness',
  'width',
  'height',
  'depth',
  'aspect_ratio',
  'viewing_angle_h',
  'viewing_angle_v',
  'ip_rating',
  'max_power',
  'avg_power',
  'weight',
  'operating_temp',
  'scan',
  'life_hours',
  'bit_depth',
  'voltage_range',
  'active_in_web',
];

/**
 * Build a column-index map from the sheet's header row.
 * Returns an object like { code: 0, product_name: 1, ... }
 * Keys are normalized to lowercase with spaces replaced by underscores.
 */
function buildColumnMap_(headerRow) {
  const map = {};
  headerRow.forEach((cell, i) => {
    const key = String(cell).trim().toLowerCase().replace(/\s+/g, '_');
    if (key) map[key] = i;
  });
  return map;
}

/**
 * Adds both custom menus to the spreadsheet.
 * Keep this as the ONLY onOpen() across all .gs files.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  // Existing: App pricing control
  ui.createMenu('SCT App Control')
    .addItem('🚀 Publish Pricing Updates to App', 'forceCacheRefresh')
    .addToUi();

  // Website product pages
  ui.createMenu('SiliconCore Web')
    .addItem('🚀 Push to Website', 'pushToWebsite')
    .addSeparator()
    .addItem('ℹ️ Setup Instructions', 'showSetupHelp')
    .addToUi();
}

/**
 * Main function: read sheet → build JSON → commit to GitHub → trigger workflow.
 */
function pushToWebsite() {
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    'Push to Website',
    'This will update all product pages on the website with the current sheet data.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  if (response !== ui.Button.YES) return;

  try {
    const products = readSheetData_();

    const json = JSON.stringify(products, null, 2);

    commitFile_(json);

    triggerWorkflow_();

    ui.alert('Success! ✅',
      `Pushed ${products.length} products to the website.\n\n` +
      'The GitHub Action is now regenerating the product pages.\n' +
      'Changes will be live in ~1 minute.',
      ui.ButtonSet.OK
    );

  } catch (err) {
    ui.alert('Error ❌', 'Failed to push:\n\n' + err.message, ui.ButtonSet.OK);
    Logger.log('Push failed: ' + err.message + '\n' + err.stack);
  }
}

/**
 * Read all rows from the "Product data web" tab and return as an array of objects.
 * Uses header names from row 1 — column order in the sheet doesn't matter.
 */
function readSheetData_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" not found.`);

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) throw new Error('Sheet appears to be empty (no data rows).');

  const headerRow = data[0];
  const col = buildColumnMap_(headerRow);

  // Validate that all expected headers are present
  const missing = EXPECTED_HEADERS.filter(h => !(h in col));
  if (missing.length > 0) {
    throw new Error(
      'Missing column(s) in sheet header row: ' + missing.join(', ') + '\n\n' +
      'Found headers: ' + Object.keys(col).join(', ')
    );
  }

  const rows = data.slice(1); // skip header

  return rows
    .filter(row => row[col.product_name] && String(row[col.product_name]).trim() !== '')
    .map(row => ({
      code:             String(row[col.code]            || ''),
      product_name:     String(row[col.product_name]    || '').trim(),
      pitch:            String(row[col.pitch]           || ''),
      taa:              String(row[col.taa]             || ''),
      indoor_outdoor:   String(row[col.indoor_outdoor]  || ''),
      brightness:       String(row[col.brightness]      || ''),
      width:            String(row[col.width]           || ''),
      height:           String(row[col.height]          || ''),
      depth:            String(row[col.depth]           || ''),
      aspect_ratio:     String(row[col.aspect_ratio]    || ''),
      viewing_angle_h:  String(row[col.viewing_angle_h] || ''),
      viewing_angle_v:  String(row[col.viewing_angle_v] || ''),
      ip_rating:        String(row[col.ip_rating]       || ''),
      max_power:        String(row[col.max_power]       || ''),
      avg_power:        String(row[col.avg_power]       || ''),
      weight:           String(row[col.weight]          || ''),
      operating_temp:   String(row[col.operating_temp]  || ''),
      scan:             String(row[col.scan]            || ''),
      life_hours:       String(row[col.life_hours]      || ''),
      bit_depth:        String(row[col.bit_depth]       || ''),
      voltage_range:    String(row[col.voltage_range]   || ''),
      active_in_web:    String(row[col.active_in_web]   || ''),
    }));
}

/**
 * Commit product_data.json to the repo via GitHub Contents API.
 */
function commitFile_(content) {
  const token = getToken_();
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  // Check if file already exists (need its SHA to update)
  let sha = null;
  const getResp = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json' },
    muteHttpExceptions: true
  });
  if (getResp.getResponseCode() === 200) {
    sha = JSON.parse(getResp.getContentText()).sha;
  }

  const payload = {
    message: 'Update product data from Google Sheets',
    content: Utilities.base64Encode(content),
    branch: BRANCH
  };
  if (sha) payload.sha = sha;

  const putResp = UrlFetchApp.fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  if (putResp.getResponseCode() !== 200 && putResp.getResponseCode() !== 201) {
    throw new Error('GitHub commit failed: ' + putResp.getContentText());
  }

  Logger.log('Committed product_data.json to GitHub');
}

/**
 * Trigger the GitHub Actions workflow to regenerate pages.
 * The workflow reads product_data.json from the repo (committed in prior step).
 */
function triggerWorkflow_() {
  const token = getToken_();
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/update-product-pages.yml/dispatches`;

  const payload = {
    ref: BRANCH,
    inputs: {
      product_data: 'committed'
    }
  };

  const resp = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  if (resp.getResponseCode() !== 204) {
    throw new Error('Workflow trigger failed: ' + resp.getContentText());
  }

  Logger.log('Triggered update-product-pages workflow');
}

/**
 * Get the GitHub token from Script Properties.
 */
function getToken_() {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) {
    throw new Error(
      'GitHub token not configured.\n\n' +
      'Go to Extensions → Apps Script → Project Settings → Script Properties\n' +
      'and add: GITHUB_TOKEN = <your token>'
    );
  }
  return token;
}

/**
 * Show setup instructions.
 */
function showSetupHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Setup Instructions',
    '1. Go to github.com/settings/tokens and create a token with "repo" scope\n' +
    '2. In this spreadsheet: Extensions → Apps Script → Project Settings\n' +
    '3. Under Script Properties, add:\n' +
    '   Key: GITHUB_TOKEN\n' +
    '   Value: <your token>\n\n' +
    '4. The "SiliconCore Web → Push to Website" menu will work after setup.',
    ui.ButtonSet.OK
  );
}
