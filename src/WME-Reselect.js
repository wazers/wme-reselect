// ==UserScript==
// @name           WME Reselect
// @description    Utility to redo & save selections
// @namespace      gylliegyllie@wazebelgium.be
// @grant          none
// @grant          GM_info
// @version        1.0.0
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @author         GyllieGyllie
// @license        MIT/BSD/X11
// @require        https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @downloadURL    https://update.greasyfork.org/scripts/549760/WME%20Reselect.user.js
// @updateURL      https://update.greasyfork.org/scripts/549760/WME%20Reselect.meta.js
// ==/UserScript==
const undoIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display: block;" viewBox="0 0 2048 2048" width="1024" height="1024" preserveAspectRatio="none">\n' +
    '<path transform="translate(0,0)" d="M 213.002 213.403 C 228.525 218.435 248.707 227.047 264.234 233.218 L 351.22 267.837 L 638.58 382.721 L 1537.2 741.473 L 1685.47 800.661 C 1695.64 804.734 1759.44 828.913 1761.86 833.366 C 1753.38 835.548 1725.44 849.168 1715.09 853.835 L 1622.35 895.07 L 1440.87 975.89 C 1401.71 993.174 1357.58 1011.46 1319.55 1030.19 L 1386.8 1097.24 C 1395.6 1106.02 1411.11 1122.47 1420.27 1129.92 C 1408.69 1132.86 1394.01 1134.85 1381.74 1137.65 C 1356.64 1143.38 1337.75 1150.51 1314.33 1160.62 C 1278.63 1125.18 1243.11 1089.55 1207.79 1053.74 C 1192.29 1038 1168.91 1015.65 1154.75 999.313 C 1163.34 994.807 1176.37 989.511 1185.65 985.408 L 1246.95 958.262 C 1327.53 922.92 1407.84 886.952 1487.86 850.36 C 1493.91 847.541 1515.9 839.276 1518.81 836.421 C 1517.39 835.033 1409.15 792.354 1401.59 789.319 L 753.978 530.505 L 487.209 423.795 C 449.017 408.633 409.085 391.639 370.72 377.514 L 379.053 400.577 L 644.758 1163.87 L 733.874 1418.56 C 748.676 1460.91 767.156 1519.21 783.988 1559.51 C 804.546 1522.09 826.039 1475.01 845.529 1436.02 L 972.711 1182.92 C 984.466 1192.7 1006.82 1216.4 1018.31 1227.93 L 1107.12 1316.94 C 1114.96 1324.71 1135.92 1347.54 1143.93 1353 C 1133.22 1375.06 1106.98 1417.98 1093.62 1439.23 C 1061.93 1408.64 1028.98 1374.34 997.985 1342.84 C 983.253 1370.86 969.064 1400.92 954.878 1429.37 L 871.055 1597.26 L 805.824 1727.86 C 793.162 1753.24 779.518 1779.65 767.78 1805.37 C 757.433 1772.86 744.498 1737.95 733.175 1705.5 L 656.77 1486.62 L 353.086 613.804 L 261.573 352.523 C 245.456 306.526 228.412 259.537 213.002 213.403 z"/>\n' +
    '<path transform="translate(0,0)" d="M 1200.72 1383.49 C 1206.06 1386.66 1229.79 1412.57 1236.1 1419.16 L 1349.04 1538.68 C 1325.04 1539.11 1288.49 1543.4 1263.86 1545.85 C 1267.17 1567.95 1280.78 1597.1 1292.59 1615.76 C 1321.14 1661.07 1366.55 1693.16 1418.8 1704.92 C 1468.3 1715.59 1520.01 1706.13 1562.52 1678.63 C 1610.9 1647.78 1642.17 1598.64 1654.27 1543.05 C 1671.2 1561.35 1699.25 1588.73 1717.4 1606.17 C 1725.03 1594.86 1730.7 1582.08 1738.25 1570.55 C 1733.3 1586.84 1729.49 1598.41 1723.04 1614.05 C 1684.42 1702.73 1613.12 1767.35 1517.11 1787.42 C 1443.82 1802.58 1367.5 1787.98 1304.97 1746.84 C 1235.75 1701.07 1194.13 1634.04 1178.04 1553.61 L 1091.1 1562.33 C 1127.87 1504.44 1164.62 1442.21 1200.72 1383.49 z"/>\n' +
    '<path transform="translate(0,0)" d="M 1445.34 1192.38 C 1578.58 1187.45 1689.08 1264.06 1730.43 1391.61 C 1759.24 1386.99 1789.22 1385.2 1817.99 1381.02 C 1784.29 1441.52 1745.33 1500.56 1711.5 1561.91 C 1704.75 1556.32 1692.11 1542.9 1685.37 1536.1 C 1668.06 1518.74 1650.87 1501.25 1633.82 1483.64 C 1612.21 1461.36 1580.99 1431.96 1561.43 1408.93 C 1574.02 1407.45 1586.63 1406.07 1599.24 1404.78 C 1612.3 1403.12 1631.19 1401.23 1643.98 1400.66 L 1643.58 1399.81 C 1617.54 1345.62 1580.19 1306.38 1522.6 1286.43 C 1455.49 1263.18 1379.64 1281.11 1328.49 1329.74 C 1301.17 1355.72 1285.3 1383.57 1273.19 1418.78 C 1251.28 1396.08 1230.17 1373.69 1207.93 1351.2 C 1258.18 1254.82 1336.91 1201.6 1445.34 1192.38 z"/>\n' +
    '</svg>';
const ScriptName = GM_info.script.name;
const ScriptVersion = GM_info.script.version;
let ChangeLog = "WME Reselect has been updated to " + ScriptVersion + "<br />";
ChangeLog = ChangeLog + "<br /><b>New: </b>";
ChangeLog = ChangeLog + "<br />" + "- Ability to redo your recent selections using the redo icon in the header";
ChangeLog = ChangeLog + "<br />" + "- Ability to redo your recent selections from your selection history in the script tab";
ChangeLog = ChangeLog + "<br />" + "- Ability to save a recent selection and reselect it later, even in new browser sessions";
let wmeSDK;
let DB = null;
const options = loadOptions();
const selectionHistory = [];
let rollbackCount = 0;
let rollbackPending = undefined;
let selectionId = 0;
// Now validate the options are ok
validateOptions(options);
function log(message) {
    if (typeof message === 'string') {
        console.log('Reselect: ' + message);
    }
    else {
        console.log('Reselect: ', message);
    }
}
// the sdk init function will be available after the WME is initialized
function WMEReselect_bootstrap() {
    if (!wmeSDK.DataModel.Countries.getTopCountry() || !WazeWrap.Ready) {
        setTimeout(WMEReselect_bootstrap, 250);
        return;
    }
    if (wmeSDK.State.isReady()) {
        WMEReselect_init();
    }
    else {
        wmeSDK.Events.once({ eventName: "wme-ready" }).then(WMEReselect_init);
    }
}
async function WMEReselect_init() {
    log("Start");
    await initDatabase();
    constructSettings();
    displayChangelog();
    addHotbarIcon();
    wmeSDK.Events.on({
        eventName: 'wme-selection-changed',
        eventHandler: addSelection
    });
    wmeSDK.Events.on({
        eventName: 'wme-map-move-end',
        eventHandler: trySelecting
    });
    /*wmeSDK.Shortcuts.createShortcut({
      callback: doRollback,
      description: 'Rollback your selection',
      shortcutId: 'wme-reselect-rollback',
      shortcutKeys: 'CS+82'
    })*/
    log("Done");
}
let usableWindow = window;
if (window.unsafeWindow) {
    // Check if unsafeWindow is available, if so use that
    usableWindow = window.unsafeWindow;
}
if (usableWindow) {
    usableWindow.SDK_INITIALIZED.then(() => {
        // initialize the sdk with your script id and script name
        wmeSDK = getWmeSdk({ scriptId: "wme-reselect", scriptName: "Reselect", version: ScriptVersion });
        WMEReselect_bootstrap();
    });
}
function displayChangelog() {
    if (!WazeWrap.Interface) {
        setTimeout(displayChangelog, 1000);
        return;
    }
    // Alert the user version updates
    if (options.lastAnnouncedVersion === ScriptVersion) {
        log('Version: ' + ScriptVersion);
    }
    else {
        WazeWrap.Interface.ShowScriptUpdate(ScriptName, ScriptVersion, ChangeLog + "<br /><br />", "https://github.com/wazers/wme-reselect");
        // @ts-ignore
        const updateName = "#wmereselect" + ScriptVersion.replaceAll(".", "");
        $(updateName + " .WWSUFooter a").text("Github");
        options.lastAnnouncedVersion = ScriptVersion;
        saveOptions(options);
    }
}
function addSelection() {
    const selection = wmeSDK.Editing.getSelection();
    if (!selection) {
        if (!rollbackPending) {
            // Only reset when no pending rollback
            // Sometimes the set selection does an unselect first?
            rollbackCount = 0;
        }
        updateSelectionOptions();
        return;
    }
    if (rollbackPending && selection.objectType === rollbackPending.objectType && selection.ids.length === rollbackPending.ids.length) {
        rollbackPending = undefined;
        return;
    }
    // We don't track this selection type
    if (options.activeSelectionTypes.indexOf(selection.objectType) === -1) {
        rollbackCount = 0;
        updateSelectionOptions();
        return;
    }
    // New selection so remove all rolled back selections
    if (options.clearRolledBackOnNew && rollbackCount > 1) {
        selectionHistory.splice(selectionHistory.length - rollbackCount + 1);
        rollbackCount = 0;
    }
    selectionHistory.push({
        ...selection,
        id: (selectionId++),
        selectTime: new Date(Date.now()),
        center: wmeSDK.Map.getMapCenter(),
        zoom: wmeSDK.Map.getZoomLevel(),
    });
    //log("count: " + selectionHistory.length);
    //log("rollback: " + rollbackCount);
    // History is becoming to large so remove oldest element
    if (selectionHistory.length > options.maxHistory) {
        selectionHistory.splice(0, 1);
    }
    updateSelectionOptions();
}
function doRollback() {
    const currentSelection = wmeSDK.Editing.getSelection();
    rollbackCount += 1;
    if (rollbackCount > selectionHistory.length) {
        rollbackCount = selectionHistory.length;
    }
    rollbackPending = selectionHistory[selectionHistory.length - rollbackCount];
    if (rollbackCount === 1 && !!currentSelection && currentSelection.objectType === rollbackPending.objectType) {
        // Selection was still active so we need to ignore current selection for rollback
        rollbackCount = 2;
        rollbackPending = selectionHistory[selectionHistory.length - rollbackCount];
    }
    log("rollback: " + rollbackCount);
    log(rollbackPending);
    restoreSelection();
    updateSelectionOptions();
}
function rollbackToId(selectionId) {
    const length = selectionHistory.length;
    rollbackCount = 1;
    while (rollbackCount < length && selectionHistory[length - rollbackCount].id !== selectionId) {
        rollbackCount += 1;
    }
    rollbackPending = selectionHistory[length - rollbackCount];
    restoreSelection();
    updateSelectionOptions();
}
function rollbackToSelection(selection) {
    rollbackCount = 0;
    rollbackPending = selection;
    restoreSelection();
    updateSelectionOptions();
}
function restoreSelection() {
    if (!rollbackPending)
        return;
    const selection = rollbackPending;
    const currentCenter = wmeSDK.Map.getMapCenter();
    if (selection.zoom !== wmeSDK.Map.getZoomLevel() || selection.center.lon !== currentCenter.lon || selection.center.lat !== currentCenter.lat) {
        wmeSDK.Map.setMapCenter({
            lonLat: selection.center,
            zoomLevel: selection.zoom
        });
    }
    else {
        wmeSDK.Editing.setSelection({
            selection: rollbackPending
        });
    }
}
function trySelecting() {
    if (rollbackPending) {
        try {
            wmeSDK.Editing.setSelection({
                selection: rollbackPending
            });
        }
        catch (e) { }
        setTimeout(trySelecting, 100);
    }
}
function addHotbarIcon() {
    const icon = $("#wme-reselect-undo");
    if (options.showHotbarIcon) {
        if (icon && icon.length > 0) {
            return;
        }
        const button = document.createElement('div');
        button.className = 'wme-reselect-undo-button';
        button.id = "wme-reselect-undo";
        button.innerHTML = undoIcon;
        button.title = 'Go back 1 selection';
        button.dataset.placement = 'bottom';
        $(button).tooltip({
            trigger: 'hover',
            position: 'down'
        });
        button.onclick = () => doRollback();
        $('.secondary-toolbar-actions:not(.user-toolbar)').prepend(button);
    }
    else {
        icon.remove();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////
//// Database Logic
////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function initDatabase() {
    const request = window.indexedDB.open("WME-Reselect", 1);
    request.onerror = () => {
        console.error("[WME-Reselect] Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (event.newVersion >= 1 && event.oldVersion < 1) {
            const savedSelects = db.createObjectStore("saved-selects", { keyPath: "name" });
            savedSelects.transaction.oncomplete = () => {
                log("Created Saved Selects store");
            };
        }
    };
    request.onsuccess = (event) => {
        log("DB ready");
        DB = event.target.result;
    };
    while (!DB) {
        await sleep(10);
    }
    if ("openDatabase" in window) {
        try {
            let created = false;
            window.openDatabase("WME-Reselect", // actual database name.  Opens existing or creates.
            "1", // version number.  *Must* be correct.
            "Database to store WME Reselect data", //
            10 * 1024 * 1024, // Size of the DB
            () => {
                created = true;
            });
            if (!created) {
                log("Migrating");
                //await migrateDb(oldDb);
                log("Migration over");
            }
        }
        catch (e) { }
    }
}
function saveSelection(selection) {
    let name = prompt("Enter the name for this selection");
    if (!name) {
        return;
    }
    if (!DB) {
        alert("Database not initialized");
        return;
    }
    // Insert into the DB
    const objectStore = DB
        .transaction("saved-selects", "readwrite")
        .objectStore("saved-selects");
    const current = objectStore.get(name);
    current.onerror = (event) => {
        console.log(event);
        alert("Failed to save selection, please try again");
    };
    current.onsuccess = (event) => {
        const current = event.target.result;
        if (current) {
            alert("Name already exists, please choose a different name");
            return;
        }
        const save = objectStore.add({
            ...selection,
            name: name,
            id: Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, '0'),
            selectTime: new Date(Date.now()),
        });
        save.onerror = (event) => {
            console.log(event);
            alert("Failed to save selection, please try again");
        };
        save.onsuccess = () => {
            alert("Saved selection: " + name);
            loadSavedSelection();
        };
    };
}
function deleteSelection(selection) {
    if (!DB) {
        alert("Database not initialized");
        return;
    }
    // Insert into the DB
    const objectStore = DB
        .transaction("saved-selects", "readwrite")
        .objectStore("saved-selects");
    objectStore.delete(selection.name);
    alert("Deleted selection: " + selection.name);
    loadSavedSelection();
}
function loadSavedSelection() {
    if (!DB)
        return;
    const request = DB
        .transaction("saved-selects")
        .objectStore("saved-selects")
        .getAll();
    request.onsuccess = (event) => {
        if (event.target.result) {
            const results = [...event.target.result];
            const holder = $('#sidepanel-reselect-bookmarks');
            holder.empty();
            results.forEach(selection => {
                const selectionTab = $(`
        <div class="wme-reselect-selection-tab" data-id="resel-hist-${selection.id}">
            <div>
                <b>${selection.name}</b>
                <br />
                ${selection.selectTime.toLocaleDateString()} ${selection.selectTime.toLocaleTimeString()}
            </div>
            <div class="bookmark-holder">
                <i id="resel-saved-${selection.id}" class="w-icon-trash w-icon"></i>
            </div>
        </div>`);
                selectionTab.on('click', () => rollbackToSelection(selection));
                holder.append(selectionTab);
                $('#resel-saved-' + selection.id).on('click', (e) => {
                    e.stopPropagation();
                    deleteSelection(selection);
                });
            });
        }
    };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////
//// Option Logic
////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function constructSettings() {
    let g = '#reselect-settings { padding: 10px; }';
    g = g + ' .wme-reselect-selection-tab { padding: 5px; cursor: pointer; border: 1px solid #dadada; border-radius: 8px; margin-bottom: 5px; display: flex; justify-content: space-between }';
    g = g + ' .wme-reselect-selection-tab:hover { background-color: #eee; }';
    g = g + ' .wme-reselect-selection-tab.active { background-color: #b1edaf; border-color: green }';
    g = g + ' .wme-reselect-selection-tab .bookmark-holder { margin: auto 0; }';
    g = g + ' .wme-reselect-selection-tab .w-icon-saved-fill { font-size: 25px; cursor: pointer; }';
    g = g + ' .wme-reselect-selection-tab .w-icon-trash { font-size: 25px; cursor: pointer; }';
    g = g + ' .wme-reselect-undo-button, { width: 25px; height: 25px; cursor: pointer; }';
    g = g + ' .wme-reselect-undo-button svg, { width: 25px; height: 25px; }';
    g = g + ' .wme-reselect-options-title { display: flex; gap: 5px; align-items: center; }';
    g = g + ' .wme-reselect-options-header { display: flex; gap: 20px; }';
    g = g + ' .wme-reselect-options-header svg { width: 40px; height: 40px; }';
    g = g + ' .wme-reselect-undo-button svg, .wme-reselect-options-title svg { width: 20px; height: 20px; }';
    $("head").append($('<style id="wme-reselect-css" type="text/css">' + g + '</style>'));
    // -- Set up the tab for the script
    wmeSDK.Sidebar.registerScriptTab().then(({ tabLabel, tabPane }) => {
        tabLabel.innerHTML = '<div class="wme-reselect-options-title">' + undoIcon + ' <span>Reselect</span></div>';
        tabLabel.title = 'Reselect';
        tabPane.innerHTML = '<div id="reselect-settings"></div>';
        const scriptContentPane = $('#reselect-settings');
        // Add the content to the settings pane
        const tabs = $('<wz-tabs fixed="true"></wz-tabs>');
        const selectionTab = $('<wz-tab is-active label="History" tooltip="History"></wz-tab>');
        const selectionTabContent = $('<div id="sidepanel-reselect-selections"></div>');
        selectionTab.append(selectionTabContent);
        const savedSelectionTab = $('<wz-tab label="Bookmarked" tooltip="Bookmarked"></wz-tab>');
        const savedSelectionTabContent = $('<div id="sidepanel-reselect-bookmarks"></div>');
        savedSelectionTab.append(savedSelectionTabContent);
        const settingsTab = $('<wz-tab label="Settings" tooltip="Settings"></wz-tab>');
        const settingsTabContent = $('<div id="sidepanel-reselect-settings"></div>');
        settingsTab.append(settingsTabContent);
        tabs.append(selectionTab);
        tabs.append(savedSelectionTab);
        tabs.append(settingsTab);
        scriptContentPane.append(tabs);
        // Setup settings
        const header = $('<div class="wme-reselect-options-header"></div>');
        settingsTabContent.append(header);
        header.append(undoIcon);
        header.append(`<h2 style="margin-top: 0;">Reselect</h2>`);
        settingsTabContent.append(`<span>Current Version: <b>${ScriptVersion}</b></span>`);
        addBooleanSettingsCallback(settingsTabContent, 'Add an icon in the top hotbar to quickly rollback a selection', 'Show Hotbar Icon', 'showHotbarIcon', (e) => {
            toggleBoolean(e);
            addHotbarIcon();
        });
        addBooleanSettings(settingsTabContent, 'Should undone selections be deleted when continuing a new selection', 'Clear undone selections on select', 'clearRolledBackOnNew');
        addTextNumberSettings(settingsTabContent, 'To avoid memory issues during long edit sessions do not make this too large', 'Max history', 'maxHistory');
        settingsTabContent.append(`<h5>Selection Types To Track:</h5>`);
        addBooleanListSettingsCallback(settingsTabContent, '', 'Segments', 'activeSelectionTypes', 'segment');
        loadSavedSelection();
    });
}
function updateSelectionOptions() {
    const holder = $('#sidepanel-reselect-selections');
    holder.empty();
    const selectionList = [...selectionHistory].reverse();
    const selectedIndex = rollbackCount - 1;
    selectionList.forEach((selection, index) => {
        const selectionTab = $(`
        <div class="wme-reselect-selection-tab ${selectedIndex === index ? 'active' : ''}" data-id="resel-hist-${selection.id}">
            <div>
                <b>${selection.ids.length}x ${selection.localizedTypeName ?? selection.objectType}</b>
                <br />
                ${selection.selectTime.toLocaleDateString()} ${selection.selectTime.toLocaleTimeString()}
            </div>
            <div class="bookmark-holder">
                <i id="resel-save-${selection.id}" class="w-icon-saved-fill w-icon"></i>
            </div>
        </div>`);
        selectionTab.on('click', () => rollbackToId(selection.id));
        holder.append(selectionTab);
        $('#resel-save-' + selection.id).on('click', (e) => {
            e.stopPropagation();
            saveSelection(selection);
        });
    });
}
function toggleTrackOptions(value) {
    const current = options['activeSelectionTypes'].indexOf(value);
    if (current >= 0) {
        options['activeSelectionTypes'].splice(current, 1);
    }
    else {
        options['activeSelectionTypes'].push(value);
    }
    saveOptions(options);
}
function getDefaultOptions() {
    return {
        lastAnnouncedVersion: '',
        maxHistory: 100,
        showHotbarIcon: true,
        clearRolledBackOnNew: false,
        activeSelectionTypes: [
            'segment'
        ]
    };
}
function loadOptions() {
    let text = localStorage.getItem("Reselect-Options");
    let options;
    if (text) {
        options = JSON.parse(text);
    }
    else {
        options = getDefaultOptions();
    }
    return options;
}
function validateOptions(options) {
    const defaultOptions = getDefaultOptions();
    // Add missing options
    for (let key in defaultOptions) {
        if (!(key in options)) {
            options[key] = defaultOptions[key];
        }
    }
}
function saveOptions(options) {
    const optionsJson = JSON.stringify(options);
    localStorage.setItem("Reselect-Options", optionsJson);
}
function toggleBoolean(event) {
    const target = event.target;
    options[target.id] = target?.checked;
    saveOptions(options);
}
function changeText(event) {
    const target = event.target;
    options[target.id] = target?.value;
    saveOptions(options);
}
function addTextNumberSettings(container, title, label, name, step = 1) {
    const currentValue = options[name];
    const textInput = $('<wz-text-input type="number" min="0" max="999" step="' + step + '" id="' + name + '" value="' + currentValue + '"></wz-text-input>');
    const optionHtml = $('<div style="margin-top: 10px;"><span Title="' + title + '">' + label + '</span></div>').append(textInput);
    container.append(optionHtml);
    textInput.on('change', changeText);
}
function addBooleanSettings(container, title, label, name) {
    addBooleanSettingsCallback(container, title, label, name, toggleBoolean);
}
function addBooleanSettingsCallback(container, title, label, name, clickHandler) {
    const currentValue = options[name];
    const checkbox = $('<wz-checkbox id="' + name + '" Title="' + title + '" name="types" disabled="false" checked="' + currentValue + '">' + label + '</wz-checkbox>');
    const optionHtml = $('<div class="urcom-option"></div>').append(checkbox);
    container.append(optionHtml);
    checkbox.on('click', clickHandler);
}
function addBooleanListSettingsCallback(container, title, label, name, value, clickHandler) {
    const currentlyActive = options[name].indexOf(value) >= 0;
    const checkbox = $('<wz-checkbox id="' + name + '" Title="' + title + '" name="types" disabled="false" checked="' + currentlyActive + '">' + label + '</wz-checkbox>');
    const optionHtml = $('<div class="reselect-option"></div>').append(checkbox);
    container.append(optionHtml);
    checkbox.on('click', clickHandler ?? (() => toggleTrackOptions(value)));
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

