var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents() {
    };
    DiagramClientSideEvents.prototype.selectionChange = function (arg) {
        {
            if (arg.state === 'Changing') {
                if (arg.type === "Addition") {
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
                } else {
                    document.getElementById('mindMapContainer').style.display = '';
                    document.getElementById('multipleChildPropertyContainer').style.display = 'none';
                    document.getElementById('propertyHeader').innerText = "Properties";
                    textareaObj.value = "";
                    UtilityMethods.prototype.onClickDisable(true);
                }
            }
        }
    };

    DiagramClientSideEvents.prototype.created = function (args) {
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
                        var node1 = document.getElementById('shortcutDiv');
                        node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
                        btnWindowMenu.items[2].iconCss = node1.style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
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
                        if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].data.branch !== 'Root') {
                            UtilityMethods.prototype.removeChild();
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
                        if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].data.branch !== 'Root') {
                            UtilityMethods.prototype.removeChild();
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
                        UtilityMethods.prototype.download(diagram.saveDiagram());
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
                {
                    name: 'navigationDown',
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        UtilityMethods.prototype.navigateChild('bottom');
                    },
                    gesture: {
                        key: ej.diagrams.Keys.Down
                    }
                },
                {
                    name: 'navigationUp',
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        UtilityMethods.prototype.navigateChild('up');
                    },
                    gesture: {
                        key: ej.diagrams.Keys.Up
                    }
                },
                {
                    name: 'navigationLeft',
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        UtilityMethods.prototype.navigateChild('right');
                    },
                    gesture: {
                        key: ej.diagrams.Keys.Left
                    }
                },
                {
                    name: 'navigationRight',
                    canExecute: function () {
                        return true;
                    },
                    execute: function () {
                        UtilityMethods.prototype.navigateChild('left');
                    },
                    gesture: {
                        key: ej.diagrams.Keys.Right
                    }
                },
            ]
        };
        diagram.dataBind();
    };

    DiagramClientSideEvents.prototype.getNodeDefaults = function (obj) {
        if (obj.id !== 'textNode' && obj.data) {
            obj.constraints = draggableCheckbox.checked ? ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop : ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.Drag;
            var empInfo = obj.data;
            obj.style = {
                fill: obj.data.fill, strokeColor: obj.data.strokeColor,
                strokeWidth: 1
            };
            if (empInfo.branch === 'Root') {
                obj.addInfo = { level: 0 };
                obj.data.level = obj.addInfo.level;
                obj.data.orientation = empInfo.branch;
            }
            obj.addInfo = { level: obj.data.level, orientation: obj.data.orientation };
            if (obj.data.orientation === "Left") {
                obj.expandIcon = { shape: isExpanded ? 'Minus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 1, y: 0.5 } };
                obj.collapseIcon = { shape: isExpanded ? 'Plus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 1, y: 0.5 } };
            } else if (obj.data.orientation === "Root") {
                obj.expandIcon = { shape: isExpanded ? 'Minus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 0.5, y: 1 } };
                obj.collapseIcon = { shape: isExpanded ? 'Plus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 0.5, y: 1 } };
            } else {
                obj.expandIcon = { shape: isExpanded ? 'Minus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 0, y: 0.5 } };
                obj.collapseIcon = { shape: isExpanded ? 'Plus' : 'None', height: 10, width: 10, fill: 'white', borderColor: 'black', offset: { x: 0, y: 0.5 } };
            }
            obj.shape.cornerRadius = empInfo.branch === 'Root' ? 5 : 0;
            obj.shape = empInfo.branch === 'Root' ? { type: 'Basic', shape: 'Ellipse' } : { type: 'Basic', shape: 'Rectangle' };
            obj.width = empInfo.branch === 'Root' ? 150 : 100;
            obj.height = empInfo.branch === 'Root' ? 75 : childHeight;
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
        setTimeout(function () {
            if (mindMapPatternTarget) {
                utilityMethods.mindmapPatternChange(mindMapPatternTarget);
            }
        }, 0);

        return obj;

    };
    DiagramClientSideEvents.prototype.getConnectorDefaults = function (connector, diagram) {
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
    };
    DiagramClientSideEvents.prototype.historyChange = function () {
        diagram.historyManager.undoStack.length > 0 ? toolbarObj.items[0].disabled = false : toolbarObj.items[0].disabled = true
        diagram.historyManager.redoStack.length > 0 ? toolbarObj.items[1].disabled = false : toolbarObj.items[1].disabled = true
    };
    DiagramClientSideEvents.prototype.keyDown = function (args) {
        if (args.key === "Enter" && args.keyModifiers === 0 && (diagram.diagramActions & ej.diagrams.DiagramAction.TextEdit)) {
            diagram.endEdit();
        }
    }
    DiagramClientSideEvents.prototype.textEdit = function (args) {
        setTimeout(() => {
            if (args.annotation) {
                var tempData = workingData.filter((a) => a.id === args.element.data.id);
                tempData[0].Label = args.annotation.content;
            }
        }, 0);
    }
    DiagramClientSideEvents.prototype.drop = function (args) {
        if (args.target && args.target.inEdges) {
            var connector = diagram.getObject(
                args.element.inEdges[0]
            );
            connector.sourceID = args.target.id;
            diagram.dataBind();
            diagram.doLayout();
            //Update connector connection direction
            var srcNode = args.element;
            var targetNode = args.target;
            var srctreeInfo = srcNode.data;
            var targettreeInfo = targetNode.data;
            var canUpdate = true;
            if (srctreeInfo.branch === 'Right' && targettreeInfo.branch === 'Left') {
                this.updateDataSource(args.element, args.target);
                connector.sourcePortID = targetNode.ports[1].id;
                connector.targetPortID = srcNode.ports[0].id;
                this.updateRightTopicOutEdges(srcNode);
                canUpdate = false;
            } else if (srctreeInfo.branch === 'Left' && targettreeInfo.branch === 'Right') {
                this.updateDataSource(args.element, args.target);
                connector.sourcePortID = targetNode.ports[0].id;
                connector.targetPortID = srcNode.ports[1].id;
                this.updateLeftTopicOutEdges(srcNode);
                canUpdate = false;
            }
            if (canUpdate) {
                this.updateDataSource(args.element, args.target);
            }
        }
    }
    DiagramClientSideEvents.prototype.updateLeftTopicOutEdges = function (node) {
        for (var i = 0; i < node.outEdges.length; i++) {
            var outconnector = diagram.getObject(node.outEdges[i]);
            outconnector.sourcePortID = 'leftPort';
            outconnector.targetPortID = 'rightPort';
            var targetNode = diagram.getObject(outconnector.targetID);
            var tempData = workingData.filter((a) => a.id === targetNode.id);
            targetNode.data.parentId = node.data.id;
            targetNode.data.branch = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            targetNode.data.level = node.data.level + 1;
            targetNode.data.orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            targetNode.addInfo.level = node.data.level + 1;
            targetNode.addInfo.orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            tempData[0].parentId = node.data.id;
            tempData[0].branch = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            tempData[0].level = node.data.level + 1;
            tempData[0].orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            if (targetNode.outEdges && targetNode.outEdges.length > 0) {
                tempData[0].hasChild = true;
                this.updateLeftTopicOutEdges(targetNode);
            }
        }
    }
    DiagramClientSideEvents.prototype.updateRightTopicOutEdges = function (node) {
        for (var i = 0; i < node.outEdges.length; i++) {
            var outconnector = diagram.getObject(node.outEdges[i]);
            outconnector.sourcePortID = 'rightPort';
            outconnector.targetPortID = 'leftPort';
            var targetNode = diagram.getObject(outconnector.targetID);
            var tempData = workingData.filter((a) => a.id === targetNode.id);
            targetNode.data.parentId = node.data.id;
            targetNode.data.branch = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            targetNode.data.level = node.data.level + 1;
            targetNode.data.orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            targetNode.addInfo.level = node.data.level + 1;
            targetNode.addInfo.orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            tempData[0].parentId = node.data.id;
            tempData[0].branch = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            tempData[0].level = node.data.level + 1;
            tempData[0].orientation = node.data.branch !== "Root" ? node.data.branch : targetNode.data.branch;
            if (targetNode.outEdges && targetNode.outEdges.length > 0) {
                tempData[0].hasChild = true;
                this.updateRightTopicOutEdges(targetNode);
            }
        }
    }

    DiagramClientSideEvents.prototype.updateDataSource = function (source, target) {
        var updateData = workingData.find(function (element) {
            return element.id === source.data.id;
        });
        if (updateData) {
            var tempData = workingData.filter((a) => a.id === target.id);
            tempData[0].hasChild = true;
            target.data.hasChild = true;
            updateData.parentId = target.data.id;
            updateData.branch = target.data.branch !== "Root" ? target.data.branch : updateData.branch;
            updateData.level = target.data.level + 1;
            updateData.orientation = target.data.branch !== "Root" ? target.data.branch : updateData.branch;
            var node = diagram.getObject(source.id);
            node.data.parentId = target.data.id;
            node.data.branch = target.data.branch !== "Root" ? target.data.branch : updateData.branch;
            node.data.level = target.data.level + 1;
            node.data.orientation = target.data.branch !== "Root" ? target.data.branch : updateData.branch;
            node.addInfo.level = target.data.level + 1;
            node.addInfo.orientation = target.data.branch !== "Root" ? target.data.branch : updateData.branch;
        }
    }

    DiagramClientSideEvents.prototype.scrollChange = function (args) {
        var zoomCurrentValue = document.getElementById("btnZoomIncrement");
        if (zoomCurrentValue && zoomCurrentValue.ej2_instances) {
            zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
            zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
        }
    }

    return DiagramClientSideEvents;
}());