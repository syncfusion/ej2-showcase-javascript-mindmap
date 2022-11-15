ej.diagrams.Diagram.Inject(ej.diagrams.DataBinding, ej.diagrams.MindMap, ej.diagrams.HierarchicalTree);
ej.base.enableRipple(true);
// Initialize nodes for diagram


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

var strokeWidth;

var strokeStyle;

var shapeOpacity;

var fontColor;

var fontFamily;

var textOpacity;

var isToolbarClicked = false;

var fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
var borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

function getNodeDefaults(obj) {
    if (obj.id !== 'textNode' && obj.data) {
        obj.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Drag;
        var empInfo = obj.data;
        obj.style = {
            fill: empInfo.branch === 'Root' ? '#D0ECFF' : '#357BD2', strokeColor: '#80BFEA',
            strokeWidth: 1
        };
        if (empInfo.branch === 'Root') {
            obj.addInfo = { level: 0 };
            obj.id = "rootNode";
        }
        obj.expandIcon = { shape: 'Path', pathData: 'M0,0L15.7462501525879,10 0,20 0,0z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.95, y: 0.5 } };
        obj.collapseIcon = { shape: 'Path', pathData: 'M25.320001,0L25.320001,32 0,16z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.95, y: 0.5 } };
        obj.shape.cornerRadius = empInfo.branch === 'Root' ? 5 : 0;
        obj.width = empInfo.branch === 'Root' ? 150 : 100;
        obj.height = empInfo.branch === 'Root' ? 50 : childHeight;
        obj.annotations = [{
            content: empInfo.Label,

        }];
        var port = getPort();
        if (!obj.ports.length) {
            for (var i = 0; i < port.length; i++) {
                obj.ports.push(new ej.diagrams.PointPort(obj, 'ports', port[i], true));
            }
        }
        hideUserHandle('Top');
    }
    return obj;
}

function getConnectorDefaults(connector, diagram) {
    connector.type = connectorType;
    connector.targetDecorator = { shape: 'None' };
    var sourceNode = diagram.getObject(connector.sourceID);
    var targetNode = diagram.getObject(connector.targetID);
    if (targetNode.data.branch === 'Right' || targetNode.data.branch === 'subRight') {
        connector.sourcePortID = sourceNode.ports[0].id;
        connector.targetPortID = targetNode.ports[1].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8E44AD' };
    }
    else if (targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft') {
        connector.sourcePortID = sourceNode.ports[1].id;
        connector.targetPortID = targetNode.ports[0].id;
        connector.style = { strokeWidth: 1, strokeColor: '#3498DB' };
    }
    connector.constraints &= ~ej.diagrams.ConnectorConstraints.Select;
    return connector;
}

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

function addNode(orientation) {
    var selectedNode = diagram.selectedItems.nodes[0];
    if (selectedNode.id !== 'rootNode') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        orientation = selectedNodeOrientation;
    }
    diagram.startGroupAction();
    var mindmapData = getMindMapShape(selectedNode);
    var node = mindmapData.node;
    addMindMapLevels('Level' + node.addInfo.level);
    node.id = 'node' + ej.diagrams.randomId();
    if (node.addInfo) {
        node.addInfo.orientation = orientation;
    }
    else {
        node.addInfo = { 'orientation': orientation };
    }
    if (orientation === "Left") {
        node.expandIcon = { shape: 'Path', pathData: 'M0,0L15.7462501525879,10 0,20 0,0z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.95, y: 0.5 } };
        node.collapseIcon = { shape: 'Path', pathData: 'M25.320001,0L25.320001,32 0,16z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.95, y: 0.5 } };
    } else {
        node.expandIcon = { shape: 'Path', pathData: 'M25.320001,0L25.320001,32 0,16z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.05, y: 0.5 } };
        node.collapseIcon = { shape: 'Path', pathData: 'M0,0L15.7462501525879,10 0,20 0,0z', height: 10, width: 10, fill: 'lightgray', offset: { x: 0.05, y: 0.5 } };
    }
    diagram.add(node);
    var connector = setConnectorDefault(diagram, orientation, mindmapData.connector, selectedNode.id, node.id);
    diagram.add(connector);
    var node1 = getNode(diagram.nodes, node.id);
    diagram.doLayout();
    diagram.endGroupAction();

    diagram.select([node1]);

    diagram.dataBind();
    // diagram.bringIntoView(node1.wrapper.bounds);

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
            minWidth: 100, maxWidth: 100, minHeight: 20, shape: { type: 'Basic', shape: 'Rectangle' },
            annotations: [annotations], style: { fill: '#000000', strokeColor: '#000000' },
            addInfo: { level: addInfo.level + 1 },
            offsetX: 200, offsetY: 200
        };
        connector = { type: 'Bezier', style: { strokeWidth: 3 } };
    }
    else {
        node = {
            minWidth: 100, maxWidth: 100, minHeight: 50, shape: { type: 'Basic', shape: 'Rectangle' },
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

function addConnector(source, target) {
    var connector = {};
    connector.id = ej.diagrams.randomId();
    connector.sourceID = source.id;
    connector.targetID = target.id;
    return connector;
}

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
                    var node = selectedObject[0];
                    this.removeSubChild(node);
                }
                diagram.doLayout();
            }
        }
    };
    DevareClick.prototype.removeSubChild = function (node) {
        for (var i = node.outEdges.length - 1; i >= 0; i--) {
            var connector = diagram.getObject(node.outEdges[i]);
            var childNode = diagram.getObject(connector.targetID);
            if (childNode.outEdges.length > 0) {
                this.removeSubChild(childNode);
            }
            else {
                diagram.remove(childNode);
            }
        }
        diagram.remove(node);
    };
    return DevareClick;
}(ej.diagrams.ToolBase));

function onchange(params) {
    if (selectedObject[0].data.branch === 'Root' || selectedObject[0].data.branch === 'Left' || selectedObject[0].data.branch === 'Right') {
        selectedObject[0].style.fill = args.target.value;
        diagram.dataBind();
    } else {
        selectedObject[0].annotations[0].style.color = args.target.value;
        diagram.dataBind();
    }
}
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
var devareuserhandle = setUserHandle('devare', devareicon, 'Top', 0.5, { top: 0, bottom: 10, left: 0, right: 0 }, 'Center', 'Center');
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
    for (var handle in diagram.selectedItems.userHandles) {
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
    { "id": "rootNode", "Label": "MindMap", "fill": "red", "branch": "Root" },
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
    dataSourceSettings: { id: 'id', parentId: 'parentId', dataSource: items, root: "rootNode" },
    //sets node default value
    getNodeDefaults: getNodeDefaults,
    getCustomTool: getTool,
    selectionChange: selectionChange,
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
    }, created: created,
    keyDown: keyDown,
    historyChange: historyChange
    // click: onfocus,
    // drop: onfocus,
    // mouseEnter: onfocus,
});


function onfocus(args) {
    document.getElementById('menu').focus();
}

function keyDown(args) {
    if (args.key === "Enter" && args.keyModifiers === 0 && (diagram.diagramActions & ej.diagrams.DiagramAction.TextEdit)) {
        diagram.endEdit();
    }
}

// Show / Hide toolbar function implementation

var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-Collapse tb-icons' });
btnHideToolbar.appendTo('#btnHideToolbar');


document.getElementById('btnHideToolbar').onclick = function () {
    var expandcollapseicon = document.getElementById('btnHideToolbar');
    var button1 = expandcollapseicon.ej2_instances[0];
    if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
        button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
    } else {
        button1.iconCss = 'sf-icon-Collapse tb-icons';
    }
    hideElements('hide-menubar', diagram);

}


// Property panel intialization

var mindmapLevelDatasource = [
    { text: 'Root', value: 'Level0' }, { text: 'Level1', value: 'Level1' },
    { text: 'Level2', value: 'Level2' }, { text: 'Level3', value: 'Level3' },
    { text: 'Level4', value: 'Level4' }, { text: 'Level5', value: 'Level5' },
];

var mindMapLevels = new ej.dropdowns.DropDownList({
    dataSource: mindmapLevelDatasource,
    fields: { text: 'text', value: 'value' },
    value: 'Level0',
    change: function (args) {
        isToolbarClicked = false;
        levelType = args.value;
    }
});
mindMapLevels.appendTo('#mindMapLevels');

var mindmapFill = new ej.inputs.ColorPicker({
    mode: 'Palette',
    change: function (args) {
        fill = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].style.fill = args.currentValue.hex;
            diagram.dataBind();
        } else {
            mindMapPropertyChange({ propertyName: 'fill', propertyValue: args });
        }
    }
});
mindmapFill.appendTo('#mindmapFill');


var mindmapFillIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
mindmapFillIconBtn.appendTo('#mindmapFillIconBtn');

var mindmapStroke = new ej.inputs.ColorPicker({
    mode: 'Palette',
    change: function (args) {
        stroke = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].style.strokeColor = args.currentValue.hex;
            diagram.dataBind();
        } else {
            mindMapPropertyChange({ propertyName: 'stroke', propertyValue: args });
        }
    }
});
mindmapStroke.appendTo('#mindmapStroke');

var mindmapStrokeIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
mindmapStrokeIconBtn.appendTo('#mindmapStrokeIconBtn');

var borderStyles = [
    { text: 'None', value: 'None', className: 'ddl-svg-style ddl_linestyle_none' },
    { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
    { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
    { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
    { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
];

var className = "ddl-svg-style ddl_linestyle_none";

var strokeStyle = new ej.dropdowns.DropDownList({
    dataSource: borderStyles,
    fields: { text: 'text', value: 'value' },
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function (args) {
        strokeStyle = args.value;
        mindMapPropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
});
strokeStyle.appendTo('#strokeStyle');

var mindmapStrokeWidth = new ej.inputs.NumericTextBox({
    min: 0.5,
    step: 0.5,
    value: 1.00,
    change: function (args) {
        strokeWidth = args.value;
        mindMapPropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
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
        mindMapPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
});
mindmapOpacitySlider.appendTo('#mindmapOpacitySlider');

var fontFamilyList = [
    { text: 'Arial', value: 'Arial' },
    { text: 'Aharoni', value: 'Aharoni' },
    { text: 'Bell MT', value: 'Bell MT' },
    { text: 'Fantasy', value: 'Fantasy' },
    { text: 'Times New Roman', value: 'Times New Roman' },
    { text: 'Segoe UI', value: 'Segoe UI' },
    { text: 'Verdana', value: 'Verdana' },
];

var mindmapFontFamilyList = new ej.dropdowns.DropDownList({
    height: '34px',
    dataSource: fontFamilyList,
    fields: { text: 'text', value: 'value' },
    value: 'Arial',
    change: function (args) {
        fontFamily = args.value;
        mindMapPropertyChange({ propertyName: 'fontFamily', propertyValue: args });
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
        mindMapPropertyChange({ propertyName: 'fontSize', propertyValue: args });
    }
});
mindmapFontSize.appendTo('#mindmapFontSize');


var mindmapTextStyleToolbar = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: textStyleClicked,
    items: [
        { prefixIcon: 'sf-icon-Bold tb-icons', tooltipText: 'Bold', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-Italic tb-icons', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-Underline tb-icons', tooltipText: 'Underline', cssClass: 'tb-item-end' }
    ]
});
mindmapTextStyleToolbar.appendTo('#mindmapTextStyleToolbar');

var mindmapTextColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    change: function (args) {
        fontColor = args.currentValue.hex;
        if (isToolbarClicked) {
            diagram.selectedItems.nodes[0].annotations[0].style.color = args.currentValue.hex;
            diagram.dataBind();
        } else {
            mindMapPropertyChange({ propertyName: 'fontColor', propertyValue: args });
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
        mindMapPropertyChange({ propertyName: 'textOpacity', propertyValue: args });
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

// Events for propertypanel

function mindMapPropertyChange(args) {

    if (diagram && diagram.nodes.length > 0) {
        for (var i = 0; i < diagram.nodes.length; i++) {
            var node = diagram.nodes[i];
            if (node.addInfo) {
                var addInfo = node.addInfo;
                if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'fill':
                            node.style.fill = getColor(fill);
                            break;
                        case 'stroke':
                            node.style.strokeColor = getColor(stroke);
                            if (node.inEdges.length > 0) {
                                var connector = getConnector(diagram.connectors, node.inEdges[0]);
                                connector.style.strokeColor = node.style.strokeColor;
                            }
                            break;
                        case 'strokewidth':
                            node.style.strokeWidth = strokeWidth;
                            if (node.inEdges.length > 0) {
                                var connector1 = getConnector(diagram.connectors, node.inEdges[0]);
                                connector1.style.strokeWidth = strokeWidth;
                            }
                            break;
                        case 'strokestyle':
                            node.style.strokeDashArray = strokeStyle;
                            if (node.inEdges.length > 0) {
                                var connector2 = getConnector(diagram.connectors, node.inEdges[0]);
                                connector2.style.strokeDashArray = strokeStyle;
                            }
                            break;
                        case 'opacity':
                            node.style.opacity = shapeOpacity / 100;
                            document.getElementById("mindmapOpacityText").value = shapeOpacity + '%';
                            break;
                        default:
                            updateMindMapTextStyle(node, args.propertyName.toString().toLowerCase());
                            break;
                    }
                }
            }
            diagram.dataBind();
        }
    }
};

function updateMindMapTextStyle(node, propertyName) {
    if (node.addInfo && node.annotations.length > 0) {
        var annotation = node.annotations[0].style;
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = fontFamily;
                break;
            case 'fontsize':
                annotation.fontSize = fontSize;
                break;
            case 'fontcolor':
                annotation.color = getColor(fontColor);
                break;
            case 'textopacity':
                annotation.opacity = textOpacity / 100;
                document.getElementById("textOpacityText").value = textOpacity + '%';
                break;
            case 'bold':
                annotation.bold = !annotation.bold;
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                break;
            case 'underline':
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                break;
        }
    }
    diagram.dataBind();
    this.isModified = true;
};
function getColor(colorName) {
    if (window.navigator.msSaveBlob && colorName.length === 9) {
        return colorName.substring(0, 7);
    }
    return colorName;
};

function textStyleClicked(args) {
    mindMapPropertyChange({ propertyName: args.item.tooltipText.toLowerCase(), propertyValue: false });
}

// Toolbar initialization

var defaultToolbarItems = [{ prefixIcon: 'sf-icon-Cut', tooltipText: 'New Diagram' },
{ prefixIcon: 'e-icons e-copy', tooltipText: 'Open Diagram', },
{ prefixIcon: 'sf-icon-Save', tooltipText: 'Save Diagram' },
{ prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram' },
{ prefixIcon: 'sf-icon-Export', tooltipText: 'Export Diagram', template: '<button id="custombtn"></button>' },
{ type: 'Separator' },
{ prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', disabled: true },
{ prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', disabled: true },
{ type: 'Separator' },
{
    prefixIcon: 'sf-icon-ZoomOut tb-icons', tooltipText: 'Zoom Out(Ctrl + -)', cssClass: 'tb-item-start'
},
{
    cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
},
{
    prefixIcon: 'sf-icon-ZoomIn tb-icons', tooltipText: 'Zoom In(Ctrl + +)', cssClass: 'tb-item-end'
},
{
    type: 'Separator'
},
{ prefixIcon: 'e-icons e-font', type: 'Input', tooltipText: 'Font Family', template: '<input type="text" id="fontFamilyBtn" style="width:100%;">' },
{ prefixIcon: 'e-icons e-fontSize', type: 'Input', tooltipText: 'Font Size', template: ' <input type="number" id="fontSizeBtn" min="0" max="50" step="1" value="12">' },
{ prefixIcon: 'sf-icon-TextInput tb-icons', tooltipText: 'Font Color', mode: 'Palette', cssClass: 'tb-item-start tb-item-fill' },
{ prefixIcon: 'e-icons e-bold', tooltipText: 'Bold', disabled: true },
{ prefixIcon: 'e-icons e-italic', tooltipText: 'Italic', disabled: true },
{ prefixIcon: 'e-icons e-underline', tooltipText: 'Underline', disabled: true },
{ type: 'Separator' },
{
    prefixIcon: 'sf-icon-ColorPickers tb-icons', tooltipText: 'Fill Color', mode: 'Palette', cssClass: 'tb-item-start tb-item-fill'
},
{
    prefixIcon: 'sf-icon-Pickers tb-icons', mode: 'Palette', tooltipText: 'Stroke Color', cssClass: 'tb-item-start tb-item-stroke'
},
{
    tooltipText: 'Change Shape', cssClass: 'tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable', template: '<button id="btnDrawShape"></button>'
},
{ type: 'Separator' },
{ prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Select Tool' },
{ prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start' },
{ type: 'Separator' },
{
    prefixIcon: 'sf-icon-AlignLeft tb-icons', tooltipText: 'Add Sibling', disabled: true
},
{
    prefixIcon: 'sf-icon-AlignHorizontally tb-icons', tooltipText: 'Peer', disabled: true
},
    // {
    //     prefixIcon: 'sf-icon-ColorPickers tb-icons', mode: 'Palette', tooltipText: 'Fill Color', cssClass: 'tb-item-start tb-item-fill'
    // },

];

// // Brain strom items
// var brainStromItems = [
//     { tooltipText: 'Horizontal Spacing', template: '<div>Horizontal Spacing</div>' },
//     { prefixIcon: 'e-icons e-fontSize', type: 'Input', tooltipText: 'Horizontal Spacing', template: ' <input type="number" id="horizontalSpacingBtn" min="50" max="80" step="5" value="50">' },
//     { type: 'Separator' },
//     { tooltipText: 'Horizontal Spacing', template: '<div>Vertical Spacing</div>' },
//     { prefixIcon: 'e-icons e-fontSize', type: 'Input', tooltipText: 'Vertical Spacing', template: ' <input type="number" id="verticalSpacingBtn" min="50" max="80" step="5" value="50">' },
// ];

//Initialize Toolbar component
var toolbarObj = new ej.navigations.Toolbar({
    clicked: toolbarClick,
    items: defaultToolbarItems, height: 28, width: '100%'
});
//Render initialized Toolbar component
var items = [{ text: 'JPG' }, { text: 'PNG' }, { text: 'BMP' }, { text: 'SVG' }];
var conTypeItems = [
    { text: 'Straight', iconCss: 'sf-icon-StraightLine' },
    { text: 'Orthogonal', iconCss: 'sf-icon-ConnectorMode' },
    { text: 'Bezier', iconCss: 'sf-icon-BeizerLine' }
];
var zoomMenuItems = [
    { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
    { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
    { text: 'Fit To Screen' }
];
var fontType = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Verdana', text: 'Verdana' }
];
btnObj = new ej.splitbuttons.DropDownButton({
    items: items, iconCss: 'sf-icon-Export', select: onselectExport,
});
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss: 'sf-icon-ConnectorMode', select: onConnectorSelect
});
var fontFamilyBtn = new ej.dropdowns.DropDownList({
    dataSource: fontType,
    content: 'font',
    fields: { value: 'type', text: 'text' }, popupWidth: 150,
    width: '100%', placeholder: 'select a font type',
    index: 0, change: function () {
        updateAnnotation('fontfamily', null, fontFamilyBtn);
    }
});

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

var drawShapesList = [
    { iconCss: 'sf-icon-Square', text: 'Rectangle' },
    { iconCss: 'sf-icon-Ellipse', text: 'Ellipse' },
    { iconCss: 'sf-icon-Triangle', text: 'Triangle' },
    { iconCss: 'sf-icon-Triangle', text: 'Cloud' }
];

var btnDrawShape = new ej.splitbuttons.DropDownButton({ items: drawShapesList, iconCss: 'sf-icon-DrawingMode', select: drawShapeChange });
btnDrawShape.appendTo('#btnDrawShape');

function drawShapeChange(args) {
    var node = diagram.selectedItems.nodes[0];
    if (args.item.text === 'Rectangle') {
        node.shape = { type: 'Basic', shape: 'Rectangle' };
    } else if (args.item.text === 'Ellipse') {
        node.shape = { type: 'Basic', shape: 'Ellipse' };
    } else if (args.item.text === 'Triangle') {
        node.shape = { type: 'Basic', shape: 'Triangle' };
    } else if (args.item.text === "Cloud") {
        node.shape = { type: 'Path', data: 'M22.0542,27.332C20.4002,27.332,19.0562,25.987,19.0562,24.333C19.0562,22.678,20.4002,21.333,22.0542,21.333C23.7082,21.333,25.0562,22.678,25.0562,24.333C25.0562,25.987,23.7082,27.332,22.0542,27.332 M30.6282,22.889L28.3522,22.889C28.1912,22.183,27.9142,21.516,27.5272,20.905L29.1392,19.293C29.3062,19.126,29.3062,18.853,29.1392,18.687L27.7032,17.251C27.6232,17.173,27.5152,17.125,27.3982,17.125C27.2862,17.125,27.1782,17.173,27.0952,17.251L25.4872,18.863C24.8732,18.476,24.2082,18.201,23.5002,18.038L23.5002,15.762C23.5002,15.525,23.3092,15.333,23.0732,15.333L21.0422,15.333C20.8062,15.333,20.6122,15.525,20.6122,15.762L20.6122,18.038C19.9072,18.201,19.2412,18.476,18.6292,18.863L17.0192,17.252C16.9342,17.168,16.8242,17.128,16.7162,17.128C16.6052,17.128,16.4972,17.168,16.4112,17.252L14.9752,18.687C14.8952,18.768,14.8492,18.878,14.8492,18.99C14.8492,19.104,14.8952,19.216,14.9752,19.293L16.5872,20.905C16.2002,21.516,15.9242,22.183,15.7642,22.889L13.4852,22.889C13.2502,22.889,13.0572,23.08,13.0572,23.316L13.0572,25.35C13.0572,25.584,13.2502,25.777,13.4852,25.777L15.7612,25.777C15.9242,26.486,16.2002,27.15,16.5872,27.764L14.9752,29.374C14.8092,29.538,14.8092,29.813,14.9752,29.979L16.4112,31.416C16.4912,31.494,16.6022,31.541,16.7162,31.541C16.8272,31.541,16.9382,31.494,17.0192,31.416L18.6252,29.805C19.2412,30.191,19.9072,30.467,20.6122,30.63L20.6122,32.906C20.6122,33.141,20.8062,33.333,21.0422,33.333L23.0732,33.333C23.3092,33.333,23.5002,33.141,23.5002,32.906L23.5002,30.63C24.2082,30.467,24.8732,30.191,25.4872,29.805L27.0952,31.416C27.1812,31.499,27.2892,31.541,27.3982,31.541C27.5102,31.541,27.6202,31.499,27.7032,31.416L29.1392,29.979C29.2202,29.899,29.2662,29.791,29.2662,29.677C29.2662,29.563,29.2202,29.453,29.1392,29.374L27.5312,27.764C27.9142,27.149,28.1912,26.486,28.3522,25.777L30.6282,25.777C30.8652,25.777,31.0552,25.584,31.0552,25.35L31.0552,23.316C31.0552,23.08,30.8652,22.889,30.6282,22.889' };
    }
    diagram.dataBind();
    removeSelectedToolbarItem();
    document.getElementById('btnDrawShape').classList.add('tb-item-selected');
}

function removeSelectedToolbarItem(args) {
    for (var i = 0; i < toolbarObj.items.length; i++) {
        var item = toolbarObj.items[i];
        if (item.cssClass.indexOf('tb-item-selected') !== -1) {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
        }
    }
    toolbarObj.dataBind();
    document.getElementById('btnDrawShape').classList.remove('tb-item-selected');

}


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

fontFamilyBtn.appendTo('#fontFamilyBtn');
btnObj.appendTo('#custombtn');
conTypeBtn.appendTo('#conTypeBtn');

function toolbarClick(args) {
    let item = args.item.tooltipText;
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    switch (item) {
        case 'Undo':
            diagram.undo();
            break;
        case 'Redo':
            diagram.redo();
            break;
        case 'Zoom In(Ctrl + +)':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'Zoom Out(Ctrl + -)':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'Bold':
        case 'Underline':
        case 'Italic':
            updateAnnotation(args.item.tooltipText);
            break;
        case 'Reset':
            diagram.reset();
            break;
        case 'Fill Color':
            showColorPicker('mindmapFill', 'tb-item-fill')
            break;
        case 'Stroke Color':
            showColorPicker('mindmapStroke', 'tb-item-fill')
            break;
        case 'Font Color':
            showColorPicker('mindmapTextColor', 'tb-item-fill')
            break;
        case 'Cut':
            diagram.cut();
            break;
        case 'Copy':
            diagram.copy();
            break;
        case 'Paste':
            diagram.paste();
            break;
        case 'Delete':
            diagram.remove();
            break;
        case 'Select Tool':
            diagram.tool = ej.diagrams.DiagramTools.Default;
            break;
        case 'Pan Tool':
            diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
            break;
        case 'New Diagram':
            diagram.clear();
            break;
        case 'Print Diagram':
            var options = {};
            options.mode = 'Data';
            diagram.print(options)
            break;
        case 'Save Diagram':
            download(diagram.saveDiagram());
            break;
        case 'Open Diagram':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
        case 'Add Sibling':
            var leftChildCount = 0;
            var rightChildCount = 0;
            if (diagram.selectedItems.nodes[0].id === "rootNode") {
                for (var i = 0; i < diagram.nodes.length; i++) {
                    if (diagram.nodes[i].addInfo && diagram.nodes[i].addInfo.level === 1) {
                        if (diagram.nodes[i].addInfo.orientation === "Left") {
                            leftChildCount++;
                        } else {
                            rightChildCount++;
                        }
                    }
                }
            }
            var orientation = leftChildCount > rightChildCount ? "Right" : "Left";
            addNode(orientation);
            break;
        case 'Peer':
            addSibilingChild();
            break;
    }
    diagram.dataBind();
}



function showColorPicker(propertyName, toolbarName) {
    isToolbarClicked = true;
    var fillElement =
        document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
    fillElement.click();
    var popupElement = document.getElementById(fillElement.id + '-popup');
    var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
    popupElement.style.left = bounds.left + 'px';
    popupElement.style.top = (bounds.top + 40) + 'px';
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
    if (args.item.text === 'Custom') {
        var ss = '';
    } else if (args.item.text === 'Fit To Screen') {
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = 'Fit ...';
        diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
    } else {
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom = {};
        switch (args.item.text) {
            case '400%':
                zoom.zoomFactor = (4 / currentZoom) - 1;
                break;
            case '300%':
                zoom.zoomFactor = (3 / currentZoom) - 1;
                break;
            case '200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                break;
            case '150%':
                zoom.zoomFactor = (1.5 / currentZoom) - 1;
                break;
            case '100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                break;
            case '75%':
                zoom.zoomFactor = (0.75 / currentZoom) - 1;
                break;
            case '50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                break;
            case '25%':
                zoom.zoomFactor = (0.25 / currentZoom) - 1;
                break;
        }
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = args.item.text;
        diagram.zoomTo(zoom);
    }
}
function pasteClick() {
    toolbarObj.items[32].disabled = false;
}

function onClickDisable(args, node) {
    if (args === false) {
        toolbarObj.items[16].disabled = false;
        toolbarObj.items[17].disabled = false;
        toolbarObj.items[18].disabled = false;
        toolbarObj.items[27].disabled = false;
        if (node.addInfo.level !== 0) {
            toolbarObj.items[28].disabled = false;
        } else {
            toolbarObj.items[28].disabled = true;
        }
    }
    else if (args === true) {
        toolbarObj.items[16].disabled = true;
        toolbarObj.items[17].disabled = true;
        toolbarObj.items[18].disabled = true;
        toolbarObj.items[27].disabled = true;
        toolbarObj.items[28].disabled = true;
    }
}

function download(data) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = 'Diagram.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}
function onfocus(args) {
    document.getElementById('menu').focus();
}

//Export the diagraming object based on the format.
function onselectExport(args) {
    var exportOptions = {};
    exportOptions.format = args.item.text;
    exportOptions.mode = 'Download';
    exportOptions.region = 'PageSettings';
    // exportOptions.multiplePage = checkBoxObj.checked;
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagram.exportDiagram(exportOptions);
}

function onConnectorSelect(args) {
    diagram.drawingObject.type = args.item.text;
    diagram.dataBind();
}


// function getTool()

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
            onClickDisable(false, arg.newValue[0]);
        }
        else {
            hideUserHandle('leftHandle');
            hideUserHandle('rightHandle');
            hideUserHandle('devare');
            onClickDisable(true);
        }
    } else if (arg.state === 'Changed') {
        var selectedItems = diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
        enableToolbarItems(selectedItems);
    }
}

function enableToolbarItems(selectedItems) {
    var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
    var toolbarClassName = 'db-toolbar-container';
    if (toolbarContainer.classList.contains('db-undo')) {
        toolbarClassName += ' db-undo';
    }
    if (toolbarContainer.classList.contains('db-redo')) {
        toolbarClassName += ' db-redo';
    }
    toolbarContainer.className = toolbarClassName;
    if (selectedItems.length === 1) {
        toolbarContainer.className = toolbarContainer.className + ' db-select';
        if (selectedItems[0] instanceof ej.diagrams.Node) {
            if (selectedItems[0].children) {
                if (selectedItems[0].children.length > 2) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                }
            }
            else {
                toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
            }
        }
    }
    else if (selectedItems.length === 2) {
        toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
    }
    else if (selectedItems.length > 2) {
        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
    }
    if (selectedItems.length > 1) {
        var isNodeExist = false;
        for (var i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i] instanceof ej.diagrams.Node) {
                toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                break;
            }
        }
    }
};

function historyChange() {
    diagram.historyManager.undoStack.length > 0 ? toolbarObj.items[6].disabled = false : toolbarObj.items[6].disabled = true
    diagram.historyManager.redoStack.length > 0 ? toolbarObj.items[7].disabled = false : toolbarObj.items[7].disabled = true
}

function UserHandleClick(args) {
    switch (args.element.name) {
        case 'Delete':
            diagram.remove();
            break;
        case 'Clone':
            diagram.paste(diagram.selectedItems.selectedObjects);
            break;
        case 'Draw':
            diagram.drawingObject.sourceID = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length - 1].id;
            diagram.dataBind();
            break;
    }
}

function created() {
    diagram.fitToPage();
    diagram.commandManager = {
        commands: [
            {
                name: 'leftChild',
                canExecute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        return true;
                    }
                    return false;
                },
                execute: function () {
                    var selectedObject = diagram.selectedItems.nodes;
                    if (selectedObject[0]) {
                        if (selectedObject[0].inEdges) {
                            addNode('Left')
                        }
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.Tab,
                }
            },
            {
                name: 'rightChild',
                canExecute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        return true;
                    }
                    return false;
                },
                execute: function () {
                    var selectedObject = diagram.selectedItems.nodes;
                    if (selectedObject[0]) {
                        if (selectedObject[0].inEdges) {
                            addNode('Right')
                        }
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.Tab,
                    keyModifiers: ej.diagrams.KeyModifiers.Shift
                }

            },
            {
                name: 'showShortCut',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    var node1 = diagram.getObject('textNode');
                    node1.visible = !node1.visible;
                    diagram.dataBind();
                },
                gesture: {
                    key: ej.diagrams.Keys.F1,
                }

            },

            {
                name: 'FitToPage',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    diagram.fitToPage({ mode: 'Width' });
                },
                gesture: {
                    key: ej.diagrams.Keys.F8,
                }

            },
            {
                name: 'boldLabel',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        var node = diagram.selectedItems.nodes[0];
                        if (node.annotations && node.annotations.length > 0) {
                            node.annotations[0].style.bold = !node.annotations[0].style.bold;
                            diagram.dataBind();
                        }
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.B,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'italicLabel',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        var node = diagram.selectedItems.nodes[0];
                        if (node.annotations && node.annotations.length > 0) {
                            node.annotations[0].style.italic = !node.annotations[0].style.italic;
                            diagram.dataBind();
                        }
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.I,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'underlineLabel',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        var node = diagram.selectedItems.nodes[0];
                        if (node.annotations && node.annotations.length > 0) {
                            node.annotations[0].style.textDecoration = node.annotations[0].style.textDecoration === 'Underline' ? 'None' : 'Underline';
                            diagram.dataBind();
                        }
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.U,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'deleteNode',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].id !== 'rootNode') {
                        removeChild();
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.BackSpace
                }
            },
            {
                name: 'removeNode',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].id !== 'rootNode') {
                        removeChild();
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.Delete
                }
            },
            {
                name: 'expandCollapse',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    if (diagram.selectedItems.nodes.length > 0) {
                        var node = diagram.selectedItems.nodes[0];
                        node.isExpanded = !node.isExpanded;
                        diagram.dataBind();
                    }
                },
                gesture: {
                    key: ej.diagrams.Keys.Space
                }
            },
            {
                name: 'expandCollapseParent',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    var node = diagram.nodes[0];
                    node.isExpanded = !node.isExpanded;
                    diagram.dataBind();
                },
                gesture: {
                    key: ej.diagrams.Keys.E,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                gesture: { key: ej.diagrams.Keys.Enter },
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    addSibilingChild()
                },
                name: 'sibilingChildTop'
            },
            {
                name: 'newDiagram',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    diagram.clear();
                },
                gesture: {
                    key: ej.diagrams.Keys.N,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'saveDiagram',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    download(diagram.saveDiagram());
                },
                gesture: {
                    key: ej.diagrams.Keys.S,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'openDiagram',
                canExecute: function () {
                    return true;
                },
                execute: function () {
                    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                },
                gesture: {
                    key: ej.diagrams.Keys.O,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
        ]
    };
    diagram.dataBind();
    var node1 = {
        id: 'textNode', width: 400, height: 420, offsetX: diagram.scrollSettings.viewPortWidth - 230, offsetY: 210,
        shape: { type: 'HTML', content: getShortCutString() }, style: { strokeWidth: 0 },
        excludeFromLayout: true,
        annotations: [{ constraints: ej.diagrams.AnnotationConstraints.ReadOnly }],
        constraints: ej.diagrams.NodeConstraints.Default & ~(ej.diagrams.NodeConstraints.Delete | ej.diagrams.NodeConstraints.Drag | ej.diagrams.NodeConstraints.Select)
    };
    diagram.add(node1);

}

window.onload = function () {
    document.getElementById('diagram').querySelector('#closeIconDiv').onclick = onHideNodeClick.bind(this);
}

function removeChild() {
    if (diagram.selectedItems.nodes.length > 0) {
        diagram.historyManager.startGroupAction();
        removeSubChild(diagram.selectedItems.nodes[0]);
        diagram.historyManager.endGroupAction();
        diagram.doLayout();
    }
    selectedItem.isModified = true;
};
function removeSubChild(node) {
    for (var i = node.outEdges.length - 1; i >= 0; i--) {
        var connector = getConnector(diagram.connectors, node.outEdges[i]);
        var childNode = getNode(diagram.nodes, connector.targetID);
        if (childNode != null && childNode.outEdges.length > 0) {
            removeSubChild(childNode, selectedItem);
        }
        else {
            diagram.remove(childNode);
        }
    }
    for (var j = node.inEdges.length - 1; j >= 0; j--) {
        var connector = getConnector(diagram.connectors, node.inEdges[j]);
        var childNode = getNode(diagram.nodes, connector.sourceID);
        var index = childNode.outEdges.indexOf(connector.id);
        if (childNode.outEdges.length > 1 && index === 0) {
            index = childNode.outEdges.length;
        }
        if (index > 0) {
            var node1 = childNode.outEdges[index - 1];
            var connector1 = diagram.getObject(node1);
            var node2 = getNode(diagram.nodes, connector1.targetID);
            diagram.select([node2]);
        }
        else {
            diagram.select([childNode]);
        }
    }
    diagram.remove(node);
};

function onHideNodeClick(args) {
    var node1 = diagram.getObject('textNode');
    node1.visible = !node1.visible;
    diagram.dataBind();
}

function addSibilingChild() {
    var selectedNode = diagram.selectedItems.nodes[0];
    if (selectedNode.id !== 'rootNode') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        var orientation_3 = selectedNodeOrientation;
        var connector1 = getConnector(diagram.connectors, selectedNode.inEdges[0]);
        diagram.startGroupAction();
        var mindmapData = getMindMapShape(this.getNode(diagram.nodes, connector1.sourceID));
        var node = mindmapData.node;
        node.id = 'node' + ej.diagrams.randomId();
        if (node.addInfo) {
            node.addInfo.orientation = orientation_3;
        }
        else {
            node.addInfo = { 'orientation': orientation_3 };
        }
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
    return '<div style="width: 400px; height: 420px; padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">' +
        '<div id="closeIconDiv" style="float: right; width: 22px; height: 22px; border: 1px solid #FFF7B5">' +
        '<span class="sf-icon-Close" style="font-size:14px;cursor:pointer;"></span>' +
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


var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom * 100) + ' %', select: zoomChange });
btnZoomIncrement.appendTo('#btnZoomIncrement');

function mindmapPatternChange(args) {
    var target = args.target;
    diagram.historyManager.startGroupAction();
    for (var i = 0; i < diagram.nodes.length; i++) {
        var node = diagram.nodes[i];
        if (node.id !== 'textNode') {
            if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                if (node.id === 'rootNode') {
                    node.height = 50;
                    node.shape = { type: 'Basic', shape: 'Rectangle' };
                }
                else {
                    node.height = 30;
                    childHeight = 30;
                    node.shape = { type: 'Basic', shape: 'Rectangle' };
                }
            } else if (target.className === 'mindmap-pattern-style mindmap-pattern2') {
                if (node.id === 'rootNode') {
                    node.height = 50;
                    node.shape = { type: 'Basic', shape: 'Ellipse' };
                }
                else {
                    node.height = 30;
                    childHeight = 30;
                    node.shape = { type: 'Basic', shape: 'Ellipse' };
                }
            } else if (target.className === 'mindmap-pattern-style mindmap-pattern3') {
                if (node.id === 'rootNode') {
                    node.height = 50;
                    node.shape = { type: 'Path', data: 'M22.0542,27.332C20.4002,27.332,19.0562,25.987,19.0562,24.333C19.0562,22.678,20.4002,21.333,22.0542,21.333C23.7082,21.333,25.0562,22.678,25.0562,24.333C25.0562,25.987,23.7082,27.332,22.0542,27.332 M30.6282,22.889L28.3522,22.889C28.1912,22.183,27.9142,21.516,27.5272,20.905L29.1392,19.293C29.3062,19.126,29.3062,18.853,29.1392,18.687L27.7032,17.251C27.6232,17.173,27.5152,17.125,27.3982,17.125C27.2862,17.125,27.1782,17.173,27.0952,17.251L25.4872,18.863C24.8732,18.476,24.2082,18.201,23.5002,18.038L23.5002,15.762C23.5002,15.525,23.3092,15.333,23.0732,15.333L21.0422,15.333C20.8062,15.333,20.6122,15.525,20.6122,15.762L20.6122,18.038C19.9072,18.201,19.2412,18.476,18.6292,18.863L17.0192,17.252C16.9342,17.168,16.8242,17.128,16.7162,17.128C16.6052,17.128,16.4972,17.168,16.4112,17.252L14.9752,18.687C14.8952,18.768,14.8492,18.878,14.8492,18.99C14.8492,19.104,14.8952,19.216,14.9752,19.293L16.5872,20.905C16.2002,21.516,15.9242,22.183,15.7642,22.889L13.4852,22.889C13.2502,22.889,13.0572,23.08,13.0572,23.316L13.0572,25.35C13.0572,25.584,13.2502,25.777,13.4852,25.777L15.7612,25.777C15.9242,26.486,16.2002,27.15,16.5872,27.764L14.9752,29.374C14.8092,29.538,14.8092,29.813,14.9752,29.979L16.4112,31.416C16.4912,31.494,16.6022,31.541,16.7162,31.541C16.8272,31.541,16.9382,31.494,17.0192,31.416L18.6252,29.805C19.2412,30.191,19.9072,30.467,20.6122,30.63L20.6122,32.906C20.6122,33.141,20.8062,33.333,21.0422,33.333L23.0732,33.333C23.3092,33.333,23.5002,33.141,23.5002,32.906L23.5002,30.63C24.2082,30.467,24.8732,30.191,25.4872,29.805L27.0952,31.416C27.1812,31.499,27.2892,31.541,27.3982,31.541C27.5102,31.541,27.6202,31.499,27.7032,31.416L29.1392,29.979C29.2202,29.899,29.2662,29.791,29.2662,29.677C29.2662,29.563,29.2202,29.453,29.1392,29.374L27.5312,27.764C27.9142,27.149,28.1912,26.486,28.3522,25.777L30.6282,25.777C30.8652,25.777,31.0552,25.584,31.0552,25.35L31.0552,23.316C31.0552,23.08,30.8652,22.889,30.6282,22.889' };
                }
                else {
                    node.height = 30;
                    childHeight = 30;
                    node.shape = { type: 'Path', data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z' };
                }
            } else {
                if (node.id === 'rootNode') {
                    node.height = 50;
                    node.shape = { type: 'Basic', shape: 'Parallelogram' };
                }
                else {
                    node.height = 30;
                    childHeight = 30;
                    node.shape = { type: 'Basic', shape: 'Pentagon' };
                }
            }
        }
        diagram.dataBind();
    }
    for (var i = 0; i < diagram.connectors.length; i++) {
        var connector = diagram.connectors[i];
        switch (target.className) {
            case 'mindmap-pattern-style mindmap-pattern1':
                connector.type = 'Bezier';
                connectorType = 'Bezier';
                templateType = 'template1';
                break;
            case 'mindmap-pattern-style mindmap-pattern2':
                connector.type = 'Bezier';
                connectorType = 'Bezier';
                templateType = 'template4';
                break;
            case 'mindmap-pattern-style mindmap-pattern3':
                connector.type = 'Bezier';
                connectorType = 'Bezier';
                templateType = 'template2';
                break;
            case 'mindmap-pattern-style mindmap-pattern4':
                connector.type = 'Bezier';
                connectorType = 'Bezier';
                templateType = 'template3';
                break;
        }
        diagram.dataBind();
    }
    diagram.historyManager.endGroupAction();
    diagram.doLayout();
}

// Menubar configuration

// Datasource for menu Items

var menuItems = [
    { text: 'New' }, { text: 'Open' }, { separator: true },
    { text: 'Save', iconCss: 'sf-icon-Save' },
    // { text: 'Rename' }, { separator: true },
    { text: 'Export', iconCss: 'sf-icon-Export' }, { separator: true },
    { text: 'Print', iconCss: 'sf-icon-Print' }
];

var btnFileMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: menuItems,
    content: 'File',
    select: menuClick,
    beforeItemRender: beforeItemRender,
});
btnFileMenu.appendTo('#btnFileMenu');

var editMenuItems = [
    { text: 'Undo', iconCss: 'sf-icon-Undo' }, { text: 'Redo', iconCss: 'sf-icon-Redo' }, { separator: true },
    { text: 'Cut', iconCss: 'sf-icon-Cut' }, { text: 'Copy', iconCss: 'sf-icon-Copy' },
    { text: 'Paste', iconCss: 'sf-icon-Paste' }, { text: 'Delete', iconCss: 'sf-icon-Delete' }, { separator: true },
    { text: 'Duplicate' }, { separator: true },
    { text: 'Select All' },
];

var btnEditMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: editMenuItems,
    content: 'Edit',
    select: menuClick,
    beforeItemRender: beforeItemRender,
});
btnEditMenu.appendTo('#btnEditMenu');

var viewMenuItems = [
    { text: 'Zoom In', iconCss: 'sf-icon-ZoomIn' }, { text: 'Zoom Out', iconCss: 'sf-icon-ZoomOut' }, { separator: true },
    { text: 'Fit To Screen' }, { separator: true },
    { text: 'Show Rulers', iconCss: 'sf-icon-Selection' },
    { text: 'Outline', iconCss: 'sf-icon-Selection' },
];

var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: viewMenuItems,
    content: 'View',
    select: menuClick,
});
btnViewMenu.appendTo('#btnViewMenu');

var windowMenuItems = [
    { text: 'Show Toolbar', iconCss: 'sf-icon-Selection' },
    { text: 'Show Properties', iconCss: 'sf-icon-Selection' },
    { text: 'Show Shortcuts', iconCss: 'sf-icon-Selection' },
];

var btnWindowMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: windowMenuItems,
    content: 'Window',
    select: menuClick,
});
btnWindowMenu.appendTo('#btnWindowMenu');

var windowMenuItems = [
    { text: 'Show Toolbar', iconCss: 'sf-icon-Selection' },
    { text: 'Show Properties', iconCss: 'sf-icon-Selection' },
    { text: 'Show Shortcuts', iconCss: 'sf-icon-Selection' },
];

var btnMindMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    content: 'BrainStroming',
});
btnMindMenu.appendTo('#btnMindMenu');

// Events for menu bar


function menuClick(args) {
    var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
        buttonElement.classList.remove('e-btn-hover');
    }
    var commandType = args.item.text.replace(/[' ']/g, '');
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    switch (commandType.toLowerCase()) {
        case 'new':
            diagram.clear();
            break;
        case 'open':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
        case 'save':
            download(diagram.saveDiagram());
            break;
        case 'print':
            var options = {};
            options.mode = 'Data';
            diagram.print(options)
            break;
        case 'export':
            var exportOptions = {};
            exportOptions.format = "PNG";
            exportOptions.mode = 'Download';
            exportOptions.region = 'PageSettings';
            exportOptions.fileName = 'Export';
            exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
            diagram.exportDiagram(exportOptions);
            break;
        case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
        case 'showrulers':
            diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'zoomin':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'zoomout':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'showtoolbar':
            hideElements('hide-toolbar', diagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showproperties':
            hideElements('hide-properties', diagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showshortcuts':
            var node1 = diagram.getObject('textNode');
            node1.visible = !node1.visible;
            diagram.dataBind();
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        default:
            executeEditMenu(diagram, commandType);
            break;
    }
    diagram.dataBind();
}

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

function executeEditMenu(diagram, commandType) {
    var key = '';
    switch (commandType.toLowerCase()) {
        case 'undo':
            diagram.undo();
            diagram.doLayout();
            break;
        case 'redo':
            diagram.redo();
            break;
        case 'cut':
            diagram.cut();
            break;
        case 'copy':
            diagram.copy();
            break;
        case 'paste':
            diagram.paste();
            break;
        case 'delete':
            this.delete();
            break;
        case 'duplicate':
            CommonKeyboardCommands.duplicateSelectedItems();
            break;
        case 'selectall':
            diagram.selectAll();
            break;
        case 'edittooltip':
            selectedItem.isModified = true;
            if (diagram.selectedItems.nodes.length > 0) {
                tooltipDialog.show();
            }
            break;
    }
}

function download(data) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = 'Diagram.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}

function beforeItemRender(args) {
    var shortCutText = getShortCutKey(args.item.text);
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
    var status = enableMenuItems(args.item.text);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}

function getShortCutKey(menuItem) {
    var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    switch (menuItem) {
        case 'New':
            shortCutKey = 'Shift' + '+N';
            break;
        case 'Open':
            shortCutKey = shortCutKey + '+O';
            break;
        case 'Save':
            shortCutKey = shortCutKey + '+S';
            break;
        case 'Undo':
            shortCutKey = shortCutKey + '+Z';
            break;
        case 'Redo':
            shortCutKey = shortCutKey + '+Y';
            break;
        case 'Cut':
            shortCutKey = shortCutKey + '+X';
            break;
        case 'Copy':
            shortCutKey = shortCutKey + '+C';
            break;
        case 'Paste':
            shortCutKey = shortCutKey + '+V';
            break;
        case 'Delete':
            shortCutKey = 'Delete';
            break;
        case 'Duplicate':
            shortCutKey = shortCutKey + '+D';
            break;
        case 'Select All':
            shortCutKey = shortCutKey + '+A';
            break;
        case 'Zoom In':
            shortCutKey = shortCutKey + '++';
            break;
        case 'Zoom Out':
            shortCutKey = shortCutKey + '+-';
            break;
        case 'Group':
            shortCutKey = shortCutKey + '+G';
            break;
        case 'Ungroup':
            shortCutKey = shortCutKey + '+U';
            break;
        case 'Send To Back':
            shortCutKey = shortCutKey + '+Shift+B';
            break;
        case 'Bring To Front':
            shortCutKey = shortCutKey + '+Shift+F';
            break;
        default:
            shortCutKey = '';
            break;
    }
    return shortCutKey;
}

function enableMenuItems(itemText) {
    var selectedDiagram = diagram;
    var selectedItems = selectedDiagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(selectedDiagram.selectedItems.connectors);
    if (itemText) {
        var commandType = itemText.replace(/[' ']/g, '');
        if (selectedItems.length === 0) {
            switch (commandType.toLowerCase()) {
                case 'edittooltip':
                    var disable = false;
                    if (!(selectedItems.length === 1)) {
                        disable = true;
                    }
                    return disable;
                case 'cut':
                    return true;
                case 'copy':
                    return true;
                case 'delete':
                    return true;
                case 'duplicate':
                    return true;
            }
        }
        if (selectedItems.length > 1) {
            switch (commandType.toLowerCase()) {
                case 'edittooltip':
                    return true;
            }
        }
        if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !== undefined) && itemText === 'Paste') {
            return true;
        }
        if (itemText === 'Undo' && selectedDiagram.historyManager.undoStack.length === 0) {
            return true;
        }
        if (itemText === 'Redo' && selectedDiagram.historyManager.redoStack.length === 0) {
            return true;
        }
        if (itemText === 'Select All') {
            if ((selectedDiagram.nodes.length === 0 && selectedDiagram.connectors.length === 0)) {
                return true;
            }
        }
        if (itemText === 'Themes' || itemText === 'Paste' || itemText === 'Show Rulers') {
            return true;
        }
        if (itemText === 'Show Shortcuts') {
            return true;
        }

    }
    return false;
};


function openUploadBox(isOpen, extensionType) {
    var defaultUpload = document.getElementById('defaultfileupload');
    defaultUpload = defaultUpload.ej2_instances[0];
    defaultUpload.clearAll();
    this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
    defaultUpload.dataBind();
    this.isOpen = isOpen;
    document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
}



