var UtilityMethods = (function () {
    function UtilityMethods() {
    };
    UtilityMethods.prototype.toolbarClick = function (args) {
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
            case 'Select Tool':
                diagram.tool = ej.diagrams.DiagramTools.Default;
                break;
            case 'Pan Tool':
                diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
                break;
            case 'Add Child':
                var orientation = getOrientation();
                addNode(orientation);
                break;
            case 'Add Sibling':
                addSibilingChild();
                break;
            case 'Add Multiple Child':
                addMultipleChild();
                break;
        }
        diagram.dataBind();
    };
    UtilityMethods.prototype.menuClick = function (args) {
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
                this.download(diagram.saveDiagram());
                break;
            case 'print':
                printDialog.show();
                break;
            case 'export':
                exportDialog.show();
                break;
            case 'fittoscreen':
                diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
                break;
            case 'showrulers':
                diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
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
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'showlines':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'showproperties':
                hideElements('hide-properties', diagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'showshortcuts':
                var node1 = diagram.getObject('textNode');
                node1.visible = !node1.visible;
                diagram.dataBind();
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'showpagebreaks':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
                break;
            case 'showmultiplepage':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                diagram.pageSettings.multiplePage = !diagram.pageSettings.multiplePage;
                break;
            default:
                this.executeEditMenu(diagram, commandType);
                break;
        }
        diagram.dataBind();
    };
    UtilityMethods.prototype.onClickDisable = function (args, node) {
        if (args === false) {
            toolbarObj.items[6].disabled = false;
            toolbarObj.items[8].disabled = false;
            if (node.addInfo.level !== 0) {
                toolbarObj.items[7].disabled = false;
            } else {
                toolbarObj.items[7].disabled = true;
            }
        }
        else if (args === true) {
            toolbarObj.items[6].disabled = true;
            toolbarObj.items[7].disabled = true;
            toolbarObj.items[8].disabled = true;
        }
    };
    UtilityMethods.prototype.download = function (data) {
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
    };

    UtilityMethods.prototype.getPaperSize = function (args) {
        var paperSize = new PaperSize();
        switch (args) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A0':
                paperSize.pageWidth = 3179;
                paperSize.pageHeight = 4494;
                break;
            case 'A1':
                paperSize.pageWidth = 2245;
                paperSize.pageHeight = 3179;
                break;
            case 'A2':
                paperSize.pageWidth = 1587;
                paperSize.pageHeight = 2245;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize
    };

    UtilityMethods.prototype.getDialogButtons = function (dialogType) {
        var buttons = [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                    click: this.btnPrintClick.bind(this),
                    buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
        }
        buttons.push({
            click: this.btnCancelClick.bind(this),
            buttonModel: { content: 'Cancel', cssClass: 'e-outline', isPrimary: true }
        });
        return buttons;
    };


    UtilityMethods.prototype.btnPrintClick = function () {
        var pageWidth = printSettings.pageWidth;
        var pageHeight = printSettings.pageHeight;
        var paperSize = this.getPaperSize(printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
        if (pageSettings.isPortrait) {
            if (pageWidth > pageHeight) {
                var temp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        } else {
            if (pageHeight > pageWidth) {
                var temp1 = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp1;
            }
        }
        diagram.print({
            region: printRegionDropdown.value, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: printMultiplePage.checked,
            pageOrientation: printPortrait.checked ? 'Portrait' : 'Landscape'
        });
        printDialog.hide();
    };
    UtilityMethods.prototype.btnExportClick = function () {
        diagram.exportDiagram({
            fileName: document.getElementById("exportfileName").value,
            format: exportFormat.value,
            region: exportRegion.value
        });
        exportDialog.hide();
    };
    UtilityMethods.prototype.btnCancelClick = function (args) {
        var ss = args.target;
        var key = ss.offsetParent.id;
        switch (key) {
            case 'exportDialog':
                exportDialog.hide();
                break;
            case 'printDialog':
                printDialog.hide();
                break;
        }
    };
    UtilityMethods.prototype.hideMenuBar = function () {
        var expandcollapseicon = document.getElementById('btnHideMenubar');
        var button1 = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf('sf-icon-chevron-up') > -1) {
            button1.iconCss = 'sf-icon-chevron-down';
        } else {
            button1.iconCss = 'sf-icon-chevron-up';
        }
        UtilityMethods.prototype.hideElements('hide-menubar', diagram);
    };
    UtilityMethods.prototype.hideElements = function (elementType, diagram) {
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
    };
    UtilityMethods.prototype.enableMenuItems = function (itemText) {
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
    UtilityMethods.prototype.getShortCutKey = function (menuItem) {
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
    };
    UtilityMethods.prototype.removeChild = function () {
        if (diagram.selectedItems.nodes.length > 0) {
            diagram.historyManager.startGroupAction();
            this.removeSubChild(diagram.selectedItems.nodes[0]);
            diagram.historyManager.endGroupAction();
            diagram.doLayout();
        }
    }
    UtilityMethods.prototype.removeSubChild = function (node) {
        for (var i = node.outEdges.length - 1; i >= 0; i--) {
            var connector = getConnector(diagram.connectors, node.outEdges[i]);
            var childNode = getNode(diagram.nodes, connector.targetID);
            if (childNode != null && childNode.outEdges.length > 0) {
                this.removeSubChild(childNode);
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
    }
    UtilityMethods.prototype.mindmapPatternChange = function (args) {
        var target = args.target;
        mindMapPatternTarget = args;
        diagram.historyManager.startGroupAction();
        for (var i = 0; i < diagram.nodes.length; i++) {
            var node = diagram.nodes[i];
            if (node.id !== 'textNode') {
                if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                    if (node.data.branch === 'Root') {
                        node.height = 70;
                        node.shape = { type: 'Basic', shape: 'Ellipse' };
                    }
                    else {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Rectangle' };
                    }
                } else if (target.className === 'mindmap-pattern-style mindmap-pattern2') {
                    if (node.data.branch === 'Root') {
                        node.height = 50;
                        node.shape = { type: 'Basic', shape: 'Rectangle' };
                    }
                    else {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Rectangle' };
                    }
                } else if (target.className === 'mindmap-pattern-style mindmap-pattern3') {
                    if (node.data.branch === 'Root') {
                        node.height = 50;
                        node.shape = { type: 'Path', data: 'M55.7315 17.239C57.8719 21.76 54.6613 27.788 47.1698 26.0787C46.0997 32.309 33.2572 35.323 28.9764 29.2951C25.7658 35.323 10.7829 33.816 10.7829 26.0787C3.29143 30.802 -0.989391 20.253 2.22121 17.239C-0.989317 14.2249 2.22121 6.68993 10.7829 8.39934C13.9935 -0.845086 25.7658 -0.845086 28.9764 5.18301C32.187 0.661909 45.0294 0.661908 47.1698 8.39934C52.5209 5.18301 60.0123 12.7179 55.7315 17.239Z' };
                    } else if (node.addInfo.level === 1) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Ellipse' };
                    } else if (node.addInfo.level === 2) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Rectangle' };
                    } else if (node.addInfo.level === 3) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Path', data: 'M24.9123 3.78029C25.0975 4.3866 24.9466 4.88753 24.8501 5.15598L24.8444 5.17188L24.8379 5.18757C24.543 5.89091 23.7879 6.37572 22.9737 6.71397C22.1386 7.06093 21.0847 7.3197 19.9302 7.51132C17.6145 7.89568 14.7099 8.03929 11.8845 7.99097C9.05877 7.94266 6.24887 7.70127 4.11982 7.29202C3.06318 7.08891 2.11594 6.83369 1.41022 6.51281C0.766274 6.22 0 5.72087 0 4.9469C0 4.01004 0.964525 3.41277 1.79867 3.05724C2.70576 2.67063 3.89493 2.37901 5.11258 2.15935C7.44304 1.73893 10.1147 1.54134 11.7304 1.52346C11.8769 1.52184 12.0122 1.59735 12.0902 1.72133V1.72133C12.2554 1.98406 12.0895 2.33011 11.7819 2.37125C6.76467 3.04222 7.47107 3.02672 5.26455 3.42478C4.10916 3.63321 3.07622 3.89464 2.39298 4.18584C1.76916 4.45172 1.91438 4.9469 1.92108 4.92166C1.95272 4.95811 2.05541 5.05272 2.36059 5.19149C2.83828 5.4087 3.58481 5.6232 4.56968 5.81251C6.52366 6.18811 9.1877 6.42238 11.9256 6.4692C14.6639 6.51602 17.4127 6.37423 19.539 6.02131C20.6055 5.8443 21.4697 5.62145 22.0872 5.36491C22.7085 5.10676 22.9449 4.87196 23.0162 4.71867C23.0759 4.54803 23.1185 4.35742 23.052 4.13951C22.9867 3.92586 22.7842 3.58431 22.1006 3.17831C20.6845 2.3372 17.4158 1.34558 10.1686 0.773902C10.0395 0.763721 9.92243 0.68718 9.86361 0.571853V0.571853C9.7338 0.317364 9.92861 0.0177825 10.2139 0.0325302C17.4619 0.407187 21.4191 0.873597 23.2463 1.95885C24.2179 2.53589 24.7233 3.16153 24.9123 3.78029Z' };
                    } else {
                        node.height = 4;
                        childHeight = 4;
                    }
                } else {
                    if (node.data.branch === 'Root') {
                        node.height = 50;
                        node.shape = { type: 'Path', data: 'M28 1.60745L32.6757 7.49196L33.1063 8.03386L33.7651 7.82174L43.5571 4.66902L41.3666 9.9757L40.8265 11.2839L42.24 11.356L52.0141 11.8539L45.233 15.0979L43.3473 16L45.233 16.9021L52.0141 20.1461L42.24 20.644L40.8265 20.716L41.3666 22.0243L43.5571 27.331L33.7651 24.1783L33.1063 23.9661L32.6757 24.508L28 30.3926L23.3243 24.508L22.8937 23.9661L22.2349 24.1783L12.4429 27.331L14.6334 22.0243L15.1734 20.7161L13.7599 20.644L3.98585 20.1461L10.767 16.9021L12.6527 16L10.767 15.0979L3.98585 11.8539L13.7599 11.356L15.1734 11.2839L14.6334 9.9757L12.4429 4.66902L22.2349 7.82174L22.8937 8.03386L23.3243 7.49196L28 1.60745Z' };
                    } else if (node.addInfo.level === 1) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Path', data: 'M55.7315 17.239C57.8719 21.76 54.6613 27.788 47.1698 26.0787C46.0997 32.309 33.2572 35.323 28.9764 29.2951C25.7658 35.323 10.7829 33.816 10.7829 26.0787C3.29143 30.802 -0.989391 20.253 2.22121 17.239C-0.989317 14.2249 2.22121 6.68993 10.7829 8.39934C13.9935 -0.845086 25.7658 -0.845086 28.9764 5.18301C32.187 0.661909 45.0294 0.661908 47.1698 8.39934C52.5209 5.18301 60.0123 12.7179 55.7315 17.239Z' };
                    } else if (node.addInfo.level === 2) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Rectangle' };
                    } else if (node.addInfo.level === 3) {
                        node.height = 30;
                        childHeight = 30;
                        node.shape = { type: 'Basic', shape: 'Ellipse' };
                    } else {
                        node.height = 3;
                        childHeight = 3;
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
                    connector.type = 'Orthogonal';
                    connectorType = 'Orthogonal';
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
    UtilityMethods.prototype.executeEditMenu = function (diagram, commandType) {
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
                this.removeChild();
                break;
            case 'duplicate':
                CommonKeyboardCommands.duplicateSelectedItems();
                break;
            case 'selectall':
                diagram.selectAll();
                break;
            case 'edittooltip':
                if (diagram.selectedItems.nodes.length > 0) {
                    tooltipDialog.show();
                }
                break;
        }
    }
    return UtilityMethods;
}());