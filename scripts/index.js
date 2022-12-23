ej.diagrams.Diagram.Inject(ej.diagrams.DataBinding, ej.diagrams.MindMap, ej.diagrams.HierarchicalTree);
// Initialize nodes for diagram
var dropDownDataSources = new DropDownDataSources();
var utilityMethods = new UtilityMethods();
var propertyChange = new PropertyChange();
var diagramEvents = new DiagramClientSideEvents();

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        /* jshint proto: true */
        ({ __proto__: [] } instanceof Array && function (der, b) { der.__proto__ = b; }) ||
        function (der, b) { for (var p in b) if (b.hasOwnProperty(p)) der[p] = b[p]; };
    return function (der, b) {
        extendStatics(der, b);
        function __() { this.constructor = der; }
        der.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ExportSettings = (function () {
    function ExportSettings() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }
    Object.defineProperty(ExportSettings.prototype, "fileName", {
        get: function () {
            return this.m_fileName;
        },
        set: function (fileName) {
            this.m_fileName = fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "format", {
        get: function () {
            return this.m_format;
        },
        set: function (format) {
            this.m_format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    return ExportSettings;
}());

var exportSettings = new ExportSettings();

var PrintSettings = (function () {
    function PrintSettings() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }
    Object.defineProperty(PrintSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageWidth", {
        get: function () {
            return this.m_pageWidth;
        },
        set: function (pageWidth) {
            this.m_pageWidth = pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageHeight", {
        get: function () {
            return this.m_pageHeight;
        },
        set: function (pageHeight) {
            this.m_pageHeight = pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isPortrait", {
        get: function () {
            return this.m_isPortrait;
        },
        set: function (isPortrait) {
            this.m_isPortrait = isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isLandscape", {
        get: function () {
            return this.m_isLandscape;
        },
        set: function (isLandscape) {
            this.m_isLandscape = isLandscape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "multiplePage", {
        get: function () {
            return this.m_multiplePage;
        },
        set: function (multiplePage) {
            this.m_multiplePage = multiplePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "paperSize", {
        get: function () {
            return this.m_paperSize;
        },
        set: function (paperSize) {
            this.m_paperSize = paperSize;
            document.getElementById('printCustomSize').style.display = 'none';
            document.getElementById('printOrientation').style.display = 'none';
            if (paperSize === 'Custom') {
                document.getElementById('printCustomSize').style.display = '';
            }
            else {
                document.getElementById('printOrientation').style.display = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return PrintSettings;
}());

var printSettings = new PrintSettings();

var PageSettings = (function () {
    function PageSettings() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
    return PageSettings;
}());

var pageSettings = new PageSettings();


// Public variables

var btnObj;
var conTypeBtn;

var connectorType = "Bezier";

var childHeight = 20;

var templateType = "template1";

var lastFillIndex = 0;

var levelType = "Level0";

var stroke;

var fill;

var index = 1;

var strokeWidth;

var strokeStyle;

var shapeOpacity;

var fontColor;

var fontFamily;

var nodeShape;

var textOpacity;

var isExpanded = false;

var isToolbarClicked = false;

var bounds;

var mindMapPatternTarget;

var fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
var borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

//creation of the Ports
function getPort() {
    var port =
        [{
            id: 'leftPort', offset: { x: 0, y: 0.5 }, visibility: ej.diagrams.PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'rightPort', offset: { x: 1, y: 0.5 }, visibility: ej.diagrams.PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        ];
    return port;
}

function addNode(orientation, label, canSelect) {
    var selectedNode = diagram.selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        orientation = selectedNodeOrientation;
    }
    diagram.startGroupAction();
    var mindmapData = getMindMapShape(selectedNode);
    var node = mindmapData.node;
    addMindMapLevels('Level' + node.addInfo.level);
    index = index + 1;
    node.id = index.toString();
    if (node.addInfo) {
        node.addInfo.orientation = orientation;
    }
    else {
        node.addInfo = { 'orientation': orientation };
    }
    selectedNode.expandIcon.shape = isExpanded ? 'Minus' : 'None';
    selectedNode.collapseIcon.shape = isExpanded ? 'Plus' : 'None';
    var nodeData = {
        id: node.id,
        Label: label ? label : "Node",
        fill: node.style.fill,
        branch: orientation,
        strokeColor: node.style.strokeColor,
        parentId: selectedNode.data.id,
        level: node.addInfo.level,
        orientation: node.addInfo.orientation,
        hasChild: false,
    };
    node.data = {
        id: node.id,
        Label: label ? label : "Node",
        fill: node.style.fill,
        strokeColor: node.style.strokeColor,
        orientation: node.addInfo.orientation,
        branch: orientation,
        parentId: selectedNode.data.id,
        level: node.addInfo.level,
        hasChild: false,
    };
    var tempData = workingData.filter(
        (a) => a.id === selectedNode.data.id
    );
    tempData[0].hasChild = true;
    workingData.push(nodeData);
    diagram.add(node);
    var connector = setConnectorDefault(diagram, orientation, mindmapData.connector, selectedNode.id, node.id);
    diagram.add(connector);
    var node1 = getNode(diagram.nodes, node.id);
    diagram.doLayout();
    diagram.endGroupAction();
    if (!canSelect) {
        diagram.select([node1]);
    }

    diagram.dataBind();
}

function getMindMapShape(parentNode) {
    var sss = {};
    var node = {};
    var connector = {};
    var addInfo = parentNode.addInfo;
    if (templateType === 'template1') {
        var annotations = {
            //verticalAlignment: 'Bottom', offset: { x: 0.5, y: 0 },
            content: ''
        };
        node = {
            minWidth: 100, maxWidth: 100, shape: { type: 'Basic', shape: 'Rectangle' },
            annotations: [annotations], style: { fill: '#000000', strokeColor: '#000000' },
            addInfo: { level: addInfo.level + 1 },
            offsetX: 200, offsetY: 200
        };
        connector = { type: 'Bezier', style: { strokeWidth: 3 } };
    }
    else {
        node = {
            minWidth: 100, maxWidth: 100, shape: { type: 'Basic', shape: 'Rectangle' },
            annotations: [{ content: '' }],
            style: { fill: '#000000', strokeColor: '#000000' },
            addInfo: { level: addInfo.level + 1 },
            offsetX: 200, offsetY: 200
        };
        if (templateType === 'template2') {
            connector = { type: 'Orthogonal', style: { strokeColor: '#000000' } };
        }
        else if (templateType === 'template3') {
            connector = { type: 'Straight', style: { strokeColor: '#000000' } };
        }
        else {
            connector = { type: 'Bezier', style: { strokeColor: '#000000' } };
        }
    }
    if (addInfo.level < 1) {
        node.style.fill = fillColorCode[lastFillIndex];
        node.style.strokeColor = borderColorCode[lastFillIndex];
        ;
        if (lastFillIndex + 1 >= fillColorCode.length) {
            lastFillIndex = 0;
        }
        else {
            lastFillIndex++;
        }
    }
    else {
        node.style.strokeColor = node.style.fill = parentNode.style.fill;
    }
    connector.type = connectorType;
    connector.style.strokeColor = node.style.fill;
    connector.targetDecorator = { shape: 'None' };
    //connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select | ej.diagrams.ConnectorConstraints.Delete;
    node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Drag;
    node.ports = [{ id: 'leftPort', offset: { x: 0, y: 0.5 } }, { id: 'rightPort', offset: { x: 1, y: 0.5 } }];
    sss.node = node;
    sss.connector = connector;
    return sss;
};

function setConnectorDefault(diagram, orientation, connector, sourceID, targetID) {
    connector.id = 'connector' + ej.diagrams.randomId();
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    connector.sourcePortID = 'rightPort';
    connector.targetPortID = 'leftPort';
    if (orientation === 'Right') {
        connector.sourcePortID = 'leftPort';
        connector.targetPortID = 'rightPort';
    }
    connector.style.strokeWidth = 3;
    return connector;
};

function getConnector(connectors, name) {
    for (var i = 0; i < connectors.length; i++) {
        if (connectors[i].id === name) {
            return connectors[i];
        }
    }
    return null;
};
function getNode(nodes, name) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].id === name) {
            return nodes[i];
        }
    }
    return null;
};

function addMindMapLevels(level) {
    var mindmap = document.getElementById('mindMapLevels');
    var dropdownlist = mindmap.ej2_instances[0];
    var dropdowndatasource = dropdownlist.dataSource;
    var isExist = false;
    for (var i = 0; i < dropdowndatasource.length; i++) {
        var data = dropdowndatasource[i];
        if (data.text === level) {
            isExist = true;
            break;
        }
    }
    if (!isExist) {
        dropdowndatasource.push({ text: level, value: level });
    }
    dropdownlist.dataSource = dropdowndatasource;
    dropdownlist.dataBind();
};

//Tool for Userhandles.
function getTool(action) {
    var tool;
    if (action === 'leftHandle') {
        tool = new LeftExtendTool(diagram.commandHandler);
    } else if (action === 'rightHandle') {
        tool = new RightExtendTool(diagram.commandHandler);
    } else if (action === 'devare') {
        tool = new DevareClick(diagram.commandHandler);
    }
    return tool;
}

var LeftExtendTool = (function (_super) {
    __extends(LeftExtendTool, _super);
    function LeftExtendTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftExtendTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    LeftExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedElement = this.commandHandler.getSelectedObject();
            if (selectedElement[0]) {
                if (selectedElement[0] instanceof ej.diagrams.Node) {
                    addNode('Right');
                }
            }
        }
    };
    return LeftExtendTool;
}(ej.diagrams.ToolBase));

var RightExtendTool = (function (_super) {
    __extends(RightExtendTool, _super);
    function RightExtendTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightExtendTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    RightExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof ej.diagrams.Node) {
                    addNode('Left');
                }
            }
        }
    };
    return RightExtendTool;
}(ej.diagrams.ToolBase));

var DevareClick = (function (_super) {
    __extends(DevareClick, _super);
    function DevareClick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DevareClick.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    DevareClick.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof ej.diagrams.Node) {
                    UtilityMethods.prototype.removeChild();
                }
                diagram.doLayout();
            }
        }
    };
    return DevareClick;
}(ej.diagrams.ToolBase));

//hide the require userhandle.
function hideUserHandle(name) {
    for (var _i = 0, _a = diagram.selectedItems.userHandles; _i < _a.length; _i++) {
        var handle_2 = _a[_i];
        if (handle_2.name === name) {
            handle_2.visible = false;
        }
    }
}

var leftarrow = 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
var rightarrow = 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
var devareicon = 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
    '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
    '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';
var leftuserhandle = setUserHandle('leftHandle', leftarrow, 'Left', 0.5, { top: 10, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
var rightuserhandle = setUserHandle('rightHandle', rightarrow, 'Right', 0.5, { top: 10, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
var devareuserhandle = setUserHandle('devare', devareicon, 'Top', 0.5, { top: 0, bottom: 0, left: 0, right: 0 }, 'Center', 'Center');
var handle = [leftuserhandle, rightuserhandle, devareuserhandle];
//set and creation of the Userhandle.
function setUserHandle(name, pathData, side, offset, margin, halignment, valignment) {
    var userhandle = {
        name: name,
        pathData: pathData,
        backgroundColor: 'black',
        pathColor: 'white',
        side: side,
        offset: offset,
        margin: margin,
        horizontalAlignment: halignment,
        verticalAlignment: valignment,
    };
    return userhandle;
}
//Change the Position of the UserHandle.
function changeUserHandlePosition(change) {
    for (var i = 0; i < diagram.selectedItems.userHandles.length; i++) {
        var handle = diagram.selectedItems.userHandles[i];
        if (handle.name === 'devare' && change === 'leftHandle') {
            applyHandle(handle, 'Left', 1, { top: 0, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');

        } else if (handle.name === 'devare' && change === 'rightHandle') {
            applyHandle(handle, 'Right', 1, { top: 0, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
        }
    }
}
//set the value for UserHandle element
function applyHandle(handle, side, offset, margin, halignment, valignment) {
    handle.side = side;
    handle.offset = offset;
    handle.margin = margin;
    handle.horizontalAlignment = halignment;
    handle.verticalAlignment = valignment;
}

var data = [
    { id: '1', Label: 'Creativity', fill: 'red', branch: 'Root', hasChild: true, level: 0, fill: "#D0ECFF", strokeColor: "#80BFEA", orientation: 'Root' },
];

var workingData = [
    { id: '1', Label: 'Creativity', fill: 'red', branch: 'Root', hasChild: true, level: 0, fill: "#D0ECFF", strokeColor: "#80BFEA", orientation: 'Root' },
];

var items = new ej.data.DataManager(data, new ej.data.Query().take(7));

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '100%',
    snapSettings: { constraints: ej.diagrams.SnapConstraints.None },
    tool: ej.diagrams.DiagramTools.SingleSelect,
    layout: {
        type: 'MindMap', horizontalSpacing: 50,
        verticalSpacing: 50,
        getBranch: function (node) {
            if (node.addInfo) {
                var addInfo = node.addInfo;
                return addInfo.orientation.toString();
            }
            return 'Left';
        }
    },
    selectedItems: { constraints: ej.diagrams.SelectorConstraints.UserHandle, userHandles: handle },
    dataSourceSettings: {
        id: 'id',
        parentId: 'parentId',
        dataSource: items,
        root: String(1),
    },

    //sets node default value
    getNodeDefaults: function (args) { DiagramClientSideEvents.prototype.getNodeDefaults(args); },
    getConnectorDefaults: function (args, diagram) { DiagramClientSideEvents.prototype.getConnectorDefaults(args, diagram); },
    getCustomTool: getTool,
    selectionChange: function (args) { DiagramClientSideEvents.prototype.selectionChange(args); },
    // selectedItems: { constraints: ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles },
    rulerSettings: {
        showRulers: true, dynamicGrid: true, horizontalRuler: {
            interval: 10,
            segmentWidth: 100,
            thickness: 25,
        },
        verticalRuler: {
            interval: 10,
            segmentWidth: 100,
            thickness: 25,
        },
    }, created: function (args) { DiagramClientSideEvents.prototype.created(args); },
    keyDown: function (args) { DiagramClientSideEvents.prototype.keyDown(args); },
    historyChange: function (args) { DiagramClientSideEvents.prototype.historyChange(args); },
    textEdit: function (args) { DiagramClientSideEvents.prototype.textEdit(args); },
    drop: function (args) { DiagramClientSideEvents.prototype.drop(args); },
    scrollChange: function (args) { DiagramClientSideEvents.prototype.scrollChange(args); }
});

// Show / Hide toolbar function implementation

var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-properties', isPrimary: true });
btnHideToolbar.appendTo('#btnHideToolbar');


document.getElementById('btnHideToolbar').onclick = function () {
    var expandcollapseicon = document.getElementById('btnHideToolbar');
    hideElements('hide-properties', diagram);
    btnWindowMenu.items[1].iconCss = btnWindowMenu.items[1].iconCss ? '' : 'sf-icon-check-tick';
}

// Treeview intialization

var treeObj = new ej.navigations.TreeView({
    fields: {
        dataSource: data,
        id: 'id',
        text: 'Label',
        parentID: 'parentId',
        hasChildren: 'hasChild',
    },
    allowEditing: true,
    keyPress: keyPress,
    nodeEdited: nodeEdited,
});

treeObj.appendTo('#tree');

function keyPress(args) {
    if (args.event.key === 'Enter') {
        addTreeNode();
    } else {
        setTimeout(() => {
            console.log(args);
        }, 0);
    }
}

function nodeEdited(args) {
    var tempData = workingData.filter((a) => a.id === args.nodeData.id);
    tempData[0].Label = args.newText;
    treeObj.selectedNodes = [args.nodeData.id];

}

function addTreeNode() {
    var targetNodeId = treeObj.selectedNodes[0];
    var tempData = workingData.filter((a) => a.id === targetNodeId);
    tempData[0].hasChild = true;
    var orientation = getTreeOrientation(tempData);
    var branch = orientation;
    var level = tempData[0].level + 1;
    var strokeColor = tempData[0].strokeColor;
    var fill = tempData[0].fill;
    var nodeId = 'tree_' + index;
    var item = {
        id: nodeId,
        Label: 'Node',
        parentId: targetNodeId,
        branch: branch,
        level: level,
        fill: fill,
        strokeColor: strokeColor,
        hasChild: false,
        orientation: branch
    };
    treeObj.addNodes([item], targetNodeId, null);
    index++;
    workingData.push(item);
    treeObj.beginEdit(nodeId);
}

function getTreeOrientation(tempData) {
    var leftChildCount = 0;
    var rightChildCount = 0;
    var orientation;
    if (tempData[0].branch === "Root") {
        for (var i = 0; i < workingData.length; i++) {
            if (workingData[i].level === 1) {
                if (workingData[i].orientation === "Left") {
                    leftChildCount++;
                } else {
                    rightChildCount++;
                }
            }
        }
        orientation = leftChildCount > rightChildCount ? "Right" : "Left";
    } else {
        orientation = tempData[0].branch;
    }
    return orientation;
}

/* Treeview intialization end */

/* Treeview context menu */

var menuItems = [
    { text: 'Add New Item' },
    { text: 'Rename Item' },
    { text: 'Remove Item' }
];
var menuOptions = {
    target: '#tree',
    items: menuItems,
    select: treemenuclick,
    beforeOpen: beforeopen
};
var menuObj = new ej.navigations.ContextMenu(menuOptions, '#contextmenu');

function treemenuclick(args) {
    var targetNodeId = treeObj.selectedNodes[0];
    if (args.item.text == "Add New Item") {
        addTreeNode();
    }
    else if (args.item.text == "Remove Item") {
        treeObj.removeNodes([targetNodeId]);
        for (var i = workingData.length - 1; i >= 0; i--) {
            if (workingData[i].id === targetNodeId) {
                workingData.splice(i, 1);
            }
        }
    }
    else if (args.item.text == "Rename Item") {
        treeObj.beginEdit(targetNodeId);
    }
}

function beforeopen(args) {
    var targetNodeId = treeObj.selectedNodes[0];
    var targetNode = document.querySelector('[data-uid="' + targetNodeId + '"]');
    if (targetNode.classList.contains('remove')) {
        menuObj.enableItems(['Remove Item'], false);
    }
    else {
        menuObj.enableItems(['Remove Item'], true);
    }
    if (targetNode.classList.contains('rename')) {
        menuObj.enableItems(['Rename Item'], false);
    }
    else {
        menuObj.enableItems(['Rename Item'], true);
    }
}


/* Treeview context menu end */

/* Export diagram intialization */

var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('export'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="exportDialogContent"><div class="row"><div class="row"> File Name </div> <div class="row db-dialog-child-prop-row">' +
        '<input type="text" id="exportfileName" value = "Untitled Diagram"></div></div>' +
        '<div class="row db-dialog-prop-row"> <div class="col-xs-6 db-col-left"> <div class="row"> Format </div>' +
        '<div class="row db-dialog-child-prop-row"> <input type="text" id="exportFormat"/> </div> </div>' +
        '<div class="col-xs-6 db-col-right"> <div class="row"> Region </div> <div class="row db-dialog-child-prop-row">' +
        '<input type="text" id="exportRegion"/></div></div></div></div>'
});
exportDialog.appendTo('#exportDialog');

var exportFormat = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format,
});
exportFormat.appendTo('#exportFormat');

// dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');

/* Export diagram intialization end */

/* Print dialog intialization */

var PaperSize = (function () {
    function PaperSize() {
    }
    return PaperSize;
}());

var printDialog = new ej.popups.Dialog({
    width: '335px',
    height: '360px',
    header: 'Print Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('print'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="printDialogContent"><div class="row"><div class="row">Region</div> <div class="row db-dialog-child-prop-row">' +
        '<input type="text" id="printRegionDropdown"/> </div> </div><div class="row db-dialog-prop-row"><div class="row">Print Settings</div>' +
        '<div class="row db-dialog-child-prop-row"><input type="text" id="printPaperSizeDropdown"/> </div> </div>' +
        '<div id="printCustomSize" class="row db-dialog-prop-row" style="display:none; height: 28px;"> <div class="col-xs-6 db-col-left">' +
        '<div class="db-text-container"><div class="db-text"><span>W</span></div><div class="db-text-input"><input id="printPageWidth" type="text" />' +
        '</div> </div> </div> <div class="col-xs-6 db-col-right"><div class="db-text-container"> <div class="db-text"><span>H</span></div>' +
        '<div class="db-text-input"><input id="printPageHeight" type="text" /></div></div></div></div><div id="printOrientation" class="row db-dialog-prop-row" style="height: 28px; padding: 5px 0px;">' +
        '<div class="col-xs-3 db-prop-col-style" style="margin-right: 8px;"><input id="printPortrait" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
        '<input id="printLandscape" type="radio"></div></div> <div class="row db-dialog-prop-row" style="margin-top: 16px"> <input id="printMultiplePage" type="checkbox" /> </div> </div>'
});
printDialog.appendTo('#printDialog');

// dropdown template for printDialog control
var printRegionDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.region
});
printRegionDropdown.appendTo('#printRegionDropdown');

// dropdown template for printDialog control
var printPaperSizeDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.paperList(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.paperSize
});
printPaperSizeDropdown.appendTo('#printPaperSizeDropdown');

// numerictextbox template for printDialog control
var printPageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageWidth
});
printPageWidth.appendTo('#printPageWidth');

// numerictextbox template for printDialog control
var printPageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageHeight
});
printPageHeight.appendTo('#printPageHeight');

// radiobutton template for printDialog control
var printPortrait = new ej.buttons.RadioButton({ label: 'Portrait', name: 'printSettings', checked: printSettings.isPortrait });
printPortrait.appendTo('#printPortrait');

// radiobutton template for printDialog control
var printLandscape = new ej.buttons.RadioButton({ label: 'Landscape', name: 'printSettings', checked: printSettings.isLandscape });
printLandscape.appendTo('#printLandscape');

// checkbox template for printDialog control
var printMultiplePage = new ej.buttons.CheckBox({
    label: 'Scale to fit 1 page', checked: printSettings.multiplePage,
    change: function (args) { multiplePage(args); }
});
printMultiplePage.appendTo('#printMultiplePage');

function multiplePage(args) {
    if (args.event) {
        printSettings.multiplePage = args.checked;
    }
};

/* Print dialog customization end */



// Property panel intialization

var mindMapLevels = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.mindmapLevelDatasource(),
    fields: { text: 'text', value: 'value' },
    value: 'Level0',
    change: function (args) {
        isToolbarClicked = false;
        levelType = args.value;
    }
});
mindMapLevels.appendTo('#mindMapLevels');

var mindMapShape = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.mindmapShapeDatasource(),
    fields: { text: 'text', value: 'value' },
    value: 'Rectangle',
    change: function (args) {
        nodeShape = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'shape', propertyValue: args });
    }
});
mindMapShape.appendTo('#mindMapShape');

var mindmapFill = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons: false,
    change: function (args) {
        fill = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].style.fill = args.currentValue.hex;
            diagram.dataBind();
        } else {
            PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'fill', propertyValue: args });
        }
    }
});
mindmapFill.appendTo('#mindmapFill');


var mindmapFillIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
mindmapFillIconBtn.appendTo('#mindmapFillIconBtn');

var mindmapStroke = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons: false,
    change: function (args) {
        stroke = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].style.strokeColor = args.currentValue.hex;
            diagram.dataBind();
        } else {
            PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'stroke', propertyValue: args });
        }
    }
});
mindmapStroke.appendTo('#mindmapStroke');

var mindmapStrokeIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
mindmapStrokeIconBtn.appendTo('#mindmapStrokeIconBtn');

var className = "ddl-svg-style ddl_linestyle_none";

var mindmapStrokeStyle = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.borderStyles(),
    fields: { text: 'text', value: 'value' },
    index: 0,
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function (args) {
        strokeStyle = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
});
mindmapStrokeStyle.appendTo('#mindmapStrokeStyle');



var mindmapStrokeWidth = new ej.inputs.NumericTextBox({
    min: 0.5,
    step: 0.5,
    value: 1.0,
    format: "###.#",
    change: function (args) {
        strokeWidth = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
    }
});
mindmapStrokeWidth.appendTo('#mindmapStrokeWidth');

var mindmapOpacitySlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 100,
    change: function (args) {
        shapeOpacity = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
});
mindmapOpacitySlider.appendTo('#mindmapOpacitySlider');

var mindmapFontFamilyList = new ej.dropdowns.DropDownList({
    height: '34px',
    dataSource: DropDownDataSources.prototype.fontFamilyList(),
    fields: { value: 'type', text: 'text' },
    value: 'Arial',
    change: function (args) {
        fontFamily = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'fontFamily', propertyValue: args });
    }
});
mindmapFontFamilyList.appendTo('#mindmapFontFamilyList');


var mindmapFontSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    value: 12,
    format: '###',
    change: function (args) {
        fontSize = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'fontSize', propertyValue: args });
    }
});
mindmapFontSize.appendTo('#mindmapFontSize');


var mindmapTextStyleToolbar = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: textStyleClicked,
    items: DropDownDataSources.prototype.textStyleItems()
});
mindmapTextStyleToolbar.appendTo('#mindmapTextStyleToolbar');

var mindmapTextColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons: false,
    change: function (args) {
        fontColor = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].annotations[0].style.color = args.currentValue.hex;
            diagram.dataBind();
        } else {
            PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'fontColor', propertyValue: args });
        }
    }
});
mindmapTextColor.appendTo('#mindmapTextColor');


var textColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
textColorIconBtn.appendTo('#textColorIconBtn');

var mindmapTextOpacitySlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 100,
    change: function (args) {
        textOpacity = args.value;
        PropertyChange.prototype.mindMapPropertyChange({ propertyName: 'textOpacity', propertyValue: args });
    }
});
mindmapTextOpacitySlider.appendTo('#mindmapTextOpacitySlider');

var bezierRadioButton = new ej.buttons.RadioButton({
    label: 'Bezier',
    name: 'bezier',
    value: 'Bezier',
    checked: true,
    change: function (args) {
        straightRadioButton.checked = false;
        straightRadioButton.dataBind();
        connectorType = "Bezier";
        for (var i = 0; i < diagram.connectors.length; i++) {
            diagram.connectors[i].type = "Bezier";
            diagram.dataBind();
        }
    }
});
bezierRadioButton.appendTo('#radio1');

var straightRadioButton = new ej.buttons.RadioButton({
    label: 'Straight',
    name: 'straight',
    value: 'Straight',
    checked: false,
    change: function (args) {
        bezierRadioButton.checked = false;
        bezierRadioButton.dataBind();
        connectorType = "Straight";
        for (var i = 0; i < diagram.connectors.length; i++) {
            diagram.connectors[i].type = "Straight";
            diagram.dataBind();
        }
    }
});
straightRadioButton.appendTo('#radio2');


var horizontalSpacing = new ej.inputs.NumericTextBox({
    min: 50,
    step: 5,
    max: 100,
    value: 50,
    format: '###',
    change: function (args) {
        diagram.layout.horizontalSpacing = Number(args.value);
        diagram.dataBind();
    }
});
horizontalSpacing.appendTo('#horizontalSpacingBtn');

var verticalSpacing = new ej.inputs.NumericTextBox({
    min: 50,
    step: 5,
    max: 80,
    value: 50,
    format: '###',
    change: function (args) {
        diagram.layout.verticalSpacing = Number(args.value);
        diagram.dataBind();
    }
});
verticalSpacing.appendTo('#verticalSpacingBtn');

var expandCheckbox = new ej.buttons.CheckBox({
    label: 'Expandable',
    checked: false,
    change: function (args) {
        isExpanded = args.checked;
        for (var i = 0; i < diagram.nodes.length; i++) {
            if (diagram.nodes[i].outEdges.length > 0) {
                diagram.nodes[i].expandIcon.shape = args.checked ? "Minus" : "None";
                diagram.nodes[i].collapseIcon.shape = args.checked ? "Plus" : "None";
            }
        }
    }
});
expandCheckbox.appendTo('#expandable');

var draggableCheckbox = new ej.buttons.CheckBox({
    label: 'Drag & Drop',
    checked: false,
    change: function (args) {
        // isExpanded = args.checked;
        for (var i = 0; i < diagram.nodes.length; i++) {
            diagram.nodes[i].constraints = args.checked ? ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop : ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Drag;
        }
    }
});
draggableCheckbox.appendTo('#draggable');

/* Property panel intialization End */

// Events for propertypanel

function getColor(colorName) {
    if (window.navigator.msSaveBlob && colorName.length === 9) {
        return colorName.substring(0, 7);
    }
    return colorName;
};

function textStyleClicked(args) {
    PropertyChange.prototype.mindMapPropertyChange({ propertyName: args.item.tooltipText.toLowerCase(), propertyValue: false });
}

var btnZoomIncrement;

var diagramRadioButton;

var textRadioButton;

// Toolbar initialization

//Initialize Toolbar component
var toolbarObj = new ej.navigations.Toolbar({
    clicked: function (args) { UtilityMethods.prototype.toolbarClick(args) },
    items: DropDownDataSources.prototype.toolbarItems(), height: 28, width: '100%',
    created: function (args) {
        if(diagram !== undefined){
            btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.zoomMenuItems(), content: Math.round(diagram.scrollSettings.currentZoom * 100) + ' %', select: zoomChange });
            btnZoomIncrement.appendTo('#btnZoomIncrement');

            diagramRadioButton = new ej.buttons.RadioButton({
                label: 'Diagram View',
                name: 'diagram view',
                value: 'Diagram View',
                checked: true,
                change: function (args) {
                    textRadioButton.checked = false;
                    diagram.dataSourceSettings.dataSource = new ej.data.DataManager(workingData);
                    diagram.dataBind();
                    document.getElementById('overlay').style.display = 'block';
                    document.getElementById('treeview').style.display = 'none';
                    document.getElementById('shortcutDiv').style.visibility = 'visible';
                    btnWindowMenu.items[2].iconCss = document.getElementById('shortcutDiv').style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
                    diagram.fitToPage();
                }
            });
            diagramRadioButton.appendTo('#diagramView');
            
            textRadioButton = new ej.buttons.RadioButton({
                label: 'Text View',
                name: 'text view',
                value: 'Text View',
                checked: false,
                change: function (args) {
                    diagram.clearSelection();
                    diagramRadioButton.checked = false;
                    treeObj.fields.dataSource = new ej.data.DataManager(workingData);
                    treeObj.dataBind();
                    document.getElementById('overlay').style.display = 'none';
                    document.getElementById('treeview').style.display = 'block';
                    document.getElementById('shortcutDiv').style.visibility = 'hidden';
                }
            });
            textRadioButton.appendTo('#textView');

        }
    },
});
//Render initialized Toolbar component

var uploadObj = new ej.inputs.Uploader({
    asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    },
    success: onUploadSuccess,
    showFileList: false
});
uploadObj.appendTo('#fileupload');
function onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
    diagram.loadDiagram(event.target.result);
}

toolbarObj.appendTo('#toolbarEditor');





function getOrientation() {
    var leftChildCount = 0;
    var rightChildCount = 0;
    var orientation;
    if (diagram.selectedItems.nodes[0].data.branch === "Root") {
        for (var i = 0; i < diagram.nodes.length; i++) {
            if (diagram.nodes[i].addInfo && diagram.nodes[i].addInfo.level === 1) {
                if (diagram.nodes[i].addInfo.orientation === "Left") {
                    leftChildCount++;
                } else {
                    rightChildCount++;
                }
            }
        }
        orientation = leftChildCount > rightChildCount ? "Right" : "Left";
    } else {
        var selectedNodeOrientation = diagram.selectedItems.nodes[0].addInfo.orientation.toString();
        orientation = selectedNodeOrientation;
    }
    return orientation;

}

function addMultipleChild() {
    document.getElementById('mindMapContainer').style.display = 'none';
    document.getElementById('multipleChildPropertyContainer').style.display = '';
    document.getElementById('propertyHeader').innerText = "Add Multiple Child";
}

var button = new ej.buttons.Button({ isPrimary: true });
button.appendTo('#addChild');


var textareaObj = new ej.inputs.TextBox({
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#multipleChildText');

document.getElementById('addChild').onclick = function () {
    var childText = textareaObj.value.split('\n');
    var orientation = getOrientation();
    for (var i = 0; i < childText.length; i++) {
        addNode(orientation, childText[i], true);
        orientation = diagram.selectedItems.nodes[0].data.branch !== "Root" ? orientation : orientation === "Left" ? "Right" : "Left";
    }
    document.getElementById('mindMapContainer').style.display = '';
    document.getElementById('multipleChildPropertyContainer').style.display = 'none';
    document.getElementById('propertyHeader').innerText = "Properties";
    textareaObj.value = "";
}

var button = new ej.buttons.Button({ cssClass: 'e-outline', isPrimary: true });
button.appendTo('#cancel');

document.getElementById('cancel').onclick = function () {
    document.getElementById('mindMapContainer').style.display = '';
    document.getElementById('multipleChildPropertyContainer').style.display = 'none';
    document.getElementById('propertyHeader').innerText = "Properties";
}


function updateAnnotation(value, fontSize, fontFamily) {
    for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
        var node = diagram.selectedItems.nodes[i];
        for (var j = 0; j < node.annotations.length; j++) {
            var annotationStyle = node.annotations[j].style;
            updateAnnotationStyle(value, annotationStyle, fontSize, fontFamily)
        }
    } for (var i = 0; i < diagram.selectedItems.connectors.length; i++) {
        var connector = diagram.selectedItems.connectors[i];
        for (var j = 0; j < connector.annotations.length; j++) {
            var connectorAnnStyle = connector.annotations[j].style;
            updateAnnotationStyle(value, connectorAnnStyle, fontSize, fontFamily)

        }
    }

}

function updateAnnotationStyle(value, annotationStyle, fontSize, fontFamily) {
    if (value === 'fontsize') {
        annotationStyle.fontSize = fontSize.value;
    } else if (value === 'Underline') {
        annotationStyle.textDecoration = annotationStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
    } else if (value === 'fontfamily') {
        annotationStyle.fontFamily = fontFamily.value.toString();
    } else if (value === 'Bold') {
        annotationStyle.bold = !annotationStyle.bold;
    } else if (value === 'Italic') {
        annotationStyle.italic = !annotationStyle.italic;
    }
    diagram.dataBind();
}

function updateFontColor(obj, args) {
    for (var i = 0; i < obj.length; i++) {
        var node = obj[i];
        for (var j = 0; j < node.annotations.length; j++) {
            node.annotations[j].style.color = args.currentValue.hex;
            diagram.dataBind();
        }
    }
}
function updateFillColor(obj, args) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].sourceID !== undefined) {
            obj[i].style.strokeColor = args.currentValue.hex;
            obj[i].style.fill = args.currentValue.hex;
            obj[i].targetDecorator.style.strokeColor = args.currentValue.hex;
            obj[i].targetDecorator.style.fill = args.currentValue.hex;
        } else {
            obj[i].style.fill = args.currentValue.hex;
        }
        diagram.dataBind();
    }
}

function updateStrokeColor(obj, args) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].sourceID !== undefined) {
            obj[i].style.strokeColor = args.currentValue.hex;
            obj[i].style.fill = args.currentValue.hex;
            obj[i].targetDecorator.style.strokeColor = args.currentValue.hex;
            obj[i].targetDecorator.style.fill = args.currentValue.hex;
        } else {
            obj[i].style.strokeColor = args.currentValue.hex;
        }
        diagram.dataBind();
    }
}


function zoomChange(args) {
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    var currentZoom = diagram.scrollSettings.currentZoom;
    var zoom = {};
    switch (args.item.text) {
        case 'Zoom In':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'Zoom Out':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'Zoom to Fit':
            diagram.fitToPage({ mode: 'Page', region: 'Content' });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
            break;
        case 'Zoom to 50%':
            zoom.zoomFactor = (0.5 / currentZoom) - 1;
            diagram.zoomTo(zoom);
            break;
        case 'Zoom to 100%':
            zoom.zoomFactor = (1 / currentZoom) - 1;
            diagram.zoomTo(zoom);
            break;
        case 'Zoom to 200%':
            zoom.zoomFactor = (2 / currentZoom) - 1;
            diagram.zoomTo(zoom);
            break;
    }

    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';

}
function pasteClick() {
    toolbarObj.items[32].disabled = false;
}

function selectionChange(arg) {
    if (arg.state === 'Changing') {
        if (arg.newValue[0] instanceof ej.diagrams.Node && arg.newValue[0].addInfo) {
            for (var _i = 0, _a = diagram.selectedItems.userHandles; _i < _a.length; _i++) {
                var handle_1 = _a[_i];
                handle_1.visible = true;
            }
            if (arg.newValue[0].addInfo.orientation === 'Left' ||
                arg.newValue[0].addInfo.orientation === 'subLeft') {
                hideUserHandle('leftHandle');
                changeUserHandlePosition('leftHandle');
            }
            else if (arg.newValue[0].addInfo.orientation === 'Right' ||
                arg.newValue[0].addInfo.orientation === 'subRight') {
                hideUserHandle('rightHandle');
                changeUserHandlePosition('rightHandle');
            }
            else if (arg.newValue[0].data.branch === 'Root') {
                hideUserHandle('devare');
            }
            UtilityMethods.prototype.onClickDisable(false, arg.newValue[0]);
        }
        else {
            hideUserHandle('leftHandle');
            hideUserHandle('rightHandle');
            hideUserHandle('devare');
            UtilityMethods.prototype.onClickDisable(true);
        }
    }
}

function historyChange() {
    diagram.historyManager.undoStack.length > 0 ? toolbarObj.items[0].disabled = false : toolbarObj.items[0].disabled = true
    diagram.historyManager.redoStack.length > 0 ? toolbarObj.items[1].disabled = false : toolbarObj.items[1].disabled = true
}

window.onload = function () {
    document.getElementById('closeIconDiv').onclick = onHideNodeClick.bind(this);
    var element = document.getElementById('btnHideToolbar');
    bounds = element.getBoundingClientRect();
    document.onmouseover = menumouseover.bind(this);
}

function menumouseover(args) {
    var target = args.target;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        var button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            if (button1.element.id === 'btnArrangeMenu') {
                selectedItem.utilityMethods.enableArrangeMenuItems(selectedItem);
            }
            var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
            buttonElement1.classList.add('e-btn-hover');
        }
    } else {
        if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
                buttonElement2.classList.remove('e-btn-hover');
            }
        }
    }
}

function onHideNodeClick(args) {
    var node1 = document.getElementById('shortcutDiv');
    node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
    btnWindowMenu.items[2].iconCss = node1.style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
    diagram.dataBind();
}

function addSibilingChild() {
    var selectedNode = diagram.selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        var orientation_3 = selectedNodeOrientation;
        var connector1 = getConnector(diagram.connectors, selectedNode.inEdges[0]);
        diagram.startGroupAction();
        var mindmapData = getMindMapShape(this.getNode(diagram.nodes, connector1.sourceID));
        var node = mindmapData.node;
        index = index + 1;
        node.id = index.toString();
        if (node.addInfo) {
            node.addInfo.orientation = orientation_3;
        }
        else {
            node.addInfo = { 'orientation': orientation_3 };
        }
        var nodeData = {
            id: node.id,
            Label: 'Node',
            fill: node.style.fill,
            branch: orientation_3,
            strokeColor: node.style.strokeColor,
            parentId: selectedNode.data.id,
            level: node.addInfo.level,
            orientation: node.addInfo.orientation,
            hasChild: false,
        };
        node.data = {
            id: node.id,
            Label: 'Node',
            fill: node.style.fill,
            strokeColor: node.style.strokeColor,
            orientation: node.addInfo.orientation,
            branch: orientation_3,
            parentId: selectedNode.data.id,
            level: node.addInfo.level,
            hasChild: false,
        };
        var tempData = workingData.filter(
            (a) => a.id === selectedNode.data.id
        );
        tempData[0].hasChild = true;
        workingData.push(nodeData);
        diagram.add(node);
        var connector = setConnectorDefault(diagram, orientation_3, mindmapData.connector, connector1.sourceID, node.id);
        diagram.add(connector);
        var node1 = getNode(diagram.nodes, node.id);
        diagram.doLayout();
        diagram.endGroupAction();
        diagram.select([node1]);
    }
}

function getShortCutString() {
    return '<div style="width: 400px; height: 440px; padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">' +
        '<div id="closeIconDiv" style="float: right; width: 22px; height: 22px; border: 1px solid #FFF7B5">' +
        '<span class="sf-icon-close" style="font-size:14px;cursor:pointer;"></span>' +
        '</div>' +
        '<div>' +
        '<span class="db-html-font-medium">Quick shortcuts</span>' +
        '</div>' +
        '<div style="padding-top:10px">' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Tab : </span>' +
        '<span class="db-html-font-normal">Add a subtopic to the left</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Shift + Tab : </span>' +
        '<span class="db-html-font-normal">Add a subtopic to the right</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Enter : </span>' +
        '<span class="db-html-font-normal">Add a new sibling child</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Delete / Backspace : </span>' +
        '<span class="db-html-font-normal">Delete a topic</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Arrow(Up, Down, Left, Right) : </span>' +
        '<span class="db-html-font-normal">Navigate between topics</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">F2 : </span>' +
        '<span class="db-html-font-normal">Edit a topic</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Esc : </span>' +
        '<span class="db-html-font-normal">End text editing</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Ctrl + B : </span>' +
        '<span class="db-html-font-normal">To make text bold</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Ctrl + I : </span>' +
        '<span class="db-html-font-normal">To make text Italic </span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Ctrl + U : </span>' +
        '<span class="db-html-font-normal">Underline the text</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +

        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Space : </span>' +
        '<span class="db-html-font-normal">Expand / Collapse the selected node</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">Ctrl + E :  </span>' +
        '<span class="db-html-font-normal">Expand / Collapse the whole diagram</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">F8 : </span>' +
        '<span class="db-html-font-normal">To Fit the diagram into the viewport</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div>' +
        '<ul>' +
        '<li>' +
        '<span class="db-html-font-medium">F1 : </span>' +
        '<span class="db-html-font-normal">Show/Hide shortcut Key</span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>';
};



diagram.appendTo('#diagram');

function minValue() {
    var size;
    if (diagram.selectedItems.nodes.length > 0) {
        size = diagram.selectedItems.nodes[0].annotations[0].style.fontSize;
    }
    else if (diagram.selectedItems.connectors.length > 0) {
        size = diagram.selectedItems.connectors[0].annotations[0].style.fontSize;
    }
    return size;
}
var fontSize = new ej.inputs.NumericTextBox({
    value: minValue(), min: 10,
    max: 20, width: '100%',
    format: '##.##',
    step: 2,
    change: function (args) { updateAnnotation('fontsize', fontSize); }
});

fontSize.appendTo('#fontSizeBtn');


// var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.zoomMenuItems(), content: Math.round(diagram.scrollSettings.currentZoom * 100) + ' %', select: zoomChange });
// btnZoomIncrement.appendTo('#btnZoomIncrement');

// Menubar configuration

// Datasource for menu Items

var btnFileMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getFileMenuItems(),
    content: 'File',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');

var btnEditMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getEditMenuItems(),
    content: 'Edit',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnEditMenu.appendTo('#btnEditMenu');

var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getViewMenuItems(),
    content: 'View',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnViewMenu.appendTo('#btnViewMenu');

var btnWindowMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getWindowMenuItems(),
    content: 'Window',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnWindowMenu.appendTo('#btnWindowMenu');

function arrangeMenuBeforeOpen(args) {
    for (var i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = 'block';
    }
    //(args.element.children[0]).style.display = 'block';
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

function arrangeMenuBeforeClose(args) {
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}


// Events for menu bar


function hideElements(elementType, diagram) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        diagramContainer.classList.remove(elementType);
    }
    else {
        diagramContainer.classList.add(elementType);
    }
    if (diagram) {
        diagram.updateViewPort();
    }
}

function beforeItemRender(args) {
    var shortCutText = UtilityMethods.prototype.getShortCutKey(args.item.text);
    if (shortCutText) {
        var shortCutSpan = document.createElement('span');
        var text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = 'none';
        args.element.appendChild(shortCutSpan);
        if (args.item.text.length === 3) {
            shortCutSpan.setAttribute('class', 'db-shortcutthree');
        } else if (args.item.text.length === 4) {
            shortCutSpan.setAttribute('class', 'db-shortcutfour');
        } else if (args.item.text.length === 5) {
            shortCutSpan.setAttribute('class', 'db-shortcutfive');
        } else if (args.item.text.length === 6) {
            shortCutSpan.setAttribute('class', 'db-shortcutsix');
        } else {
            shortCutSpan.setAttribute('class', 'db-shortcut');
        }
    }
    var status = UtilityMethods.prototype.enableMenuItems(args.item.text);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}





