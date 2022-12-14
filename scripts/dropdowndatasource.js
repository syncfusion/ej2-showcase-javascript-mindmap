var DropDownDataSources = (function () {
    function DropDownDataSources() {
    };
    DropDownDataSources.prototype.getFileMenuItems = function () {
        var items = [
            { text: 'New' , iconCss: 'sf-icon-new'}, { text: 'Open', iconCss: 'sf-icon-open' }, { separator: true },
            { text: 'Save', iconCss: 'sf-icon-Save' },
            // { text: 'Rename' }, { separator: true },
            { text: 'Export', iconCss: 'sf-icon-Export' }, { separator: true },
            { text: 'Print', iconCss: 'sf-icon-Print' }
        ];
        return items;
    };
    DropDownDataSources.prototype.getEditMenuItems = function () {
        var items = [
            { text: 'Undo', iconCss: 'sf-icon-undo' }, { text: 'Redo', iconCss: 'sf-icon-redo' }, { separator: true },
            { text: 'Cut', iconCss: 'sf-icon-Cut' }, { text: 'Copy', iconCss: 'sf-icon-Copy' },
            { text: 'Paste', iconCss: 'sf-icon-Paste' }, { text: 'Delete', iconCss: 'sf-icon-Delete' }, { separator: true },
            { text: 'Select All' },
        ]
        return items;
    };
    DropDownDataSources.prototype.getDesignMenuItems = function () {
        var items = [
            {
                text: 'Orientation',
                items: [
                    { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
                    { text: 'Portrait', iconCss: '' }
                ]
            },
            {
                text: 'Size', iconCss: 'em-icons e-copy',
                items: this.paperList1()
            },
        ]
        return items;
    };

    DropDownDataSources.prototype.getViewMenuItems = function () {
        var items = [
            { text: 'Zoom In', iconCss: 'sf-icon-zoom-in' }, { text: 'Zoom Out', iconCss: 'sf-icon-zoom-out' }, { separator: true },
            { text: 'Fit To Screen' }, { separator: true },
            { text: 'Show Rulers', iconCss: 'sf-icon-check-tick' },
            { text: 'Show Lines' },
            // { text: 'Show Page Breaks' },
            // { text: 'Show Multiple page' },
        ]
        return items;
    };

    DropDownDataSources.prototype.getWindowMenuItems = function () {
        var items = [
            { text: 'Show Toolbar', iconCss: 'sf-icon-check-tick' },
            { text: 'Show Properties', iconCss: 'sf-icon-check-tick' },
            { text: 'Show Shortcuts', iconCss: 'sf-icon-check-tick' },
        ]
        return items;
    };

    DropDownDataSources.prototype.paperList = function () {
        var paperList = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
        ];
        return paperList;
    };
    DropDownDataSources.prototype.paperList1 = function () {
        var paperList1 = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter', iconCss: 'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
        ];
        return paperList1;
    };
    DropDownDataSources.prototype.fileFormats = function () {
        var fileFormats = [
            { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
            { text: 'BMP', value: 'BMP' }, { text: 'SVG', value: 'SVG' }
        ];
        return fileFormats;
    };
    DropDownDataSources.prototype.diagramRegions = function () {
        var diagramRegions = [
            { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
        ];
        return diagramRegions;
    };
    DropDownDataSources.prototype.zoomMenuItems = function () {
        var items = [
            { text: 'Zoom In' },{ text: 'Zoom Out' },{ text: 'Zoom to Fit' },{ text: 'Zoom to 50%' },
            { text: 'Zoom to 100%' },{ text: 'Zoom to 200%' },
        ];
        return items;
    };
    DropDownDataSources.prototype.borderStyles = function () {
        var borderStyles = [
            { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
            { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
            { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
            { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
            { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
        ];
        return borderStyles;
    };

    DropDownDataSources.prototype.mindmapLevelDatasource = function () {
        var items = [
            { text: 'Root', value: 'Level0' }, { text: 'Level1', value: 'Level1' },
            { text: 'Level2', value: 'Level2' }, { text: 'Level3', value: 'Level3' },
            { text: 'Level4', value: 'Level4' }, { text: 'Level5', value: 'Level5' },
            { text: 'Selected Item', value: 'Selected Item' },
        ];
        return items;
    };

    DropDownDataSources.prototype.mindmapShapeDatasource = function () {
        var items = [
            { text: 'Rectangle', value: 'Rectangle' }, { text: 'Ellipse', value: 'Ellipse' },
            { text: 'Star', value: 'Star' }, { text: 'Cloud', value: 'Cloud' },
            { text: 'Free hand', value: 'Free hand' },
        ];
        return items;
    };

    DropDownDataSources.prototype.fontFamilyList = function () {
        var fontFamilyList = [
            { type: 'Arial', text: 'Arial' },
            { type: 'Aharoni', text: 'Aharoni' },
            { type: 'Bell MT', text: 'Bell MT' },
            { type: 'Fantasy', text: 'Fantasy' },
            { type: 'Times New Roman', text: 'Times New Roman' },
            { type: 'Segoe UI', text: 'Segoe UI' },
            { type: 'Verdana', text: 'Verdana' }
        ];
        return fontFamilyList;
    };

    DropDownDataSources.prototype.textStyleItems = function () {
        var items = [
            { prefixIcon: 'sf-icon-Bold tb-icons', tooltipText: 'Bold', cssClass: 'tb-item-start' },
            { prefixIcon: 'sf-icon-Italic tb-icons', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
            { prefixIcon: 'sf-icon-Underline tb-icons', tooltipText: 'Underline', cssClass: 'tb-item-end' }
        ];
        return items;
    };

    DropDownDataSources.prototype.toolbarItems = function () {
        let items = [
            { prefixIcon: 'sf-icon-undo', tooltipText: 'Undo', disabled: false },
            { prefixIcon: 'sf-icon-redo', tooltipText: 'Redo', disabled: true },
            {
                type: 'Separator'
            },
            { prefixIcon: 'sf-icon-pointer tb-icons', tooltipText: 'Select Tool', cssClass:'tb-item-middle tb-item-selected' },
            { prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start' },
            {
                type: 'Separator'
            },
            {
                prefixIcon: 'sf-icon-add-child', tooltipText: 'Add Child', disabled: true
            },
            {
                prefixIcon: 'sf-icon-add-sibling', tooltipText: 'Add Sibling', disabled: true
            },
            {
                prefixIcon: 'sf-icon-multiple-child', tooltipText: 'Add Multiple Child', disabled: true
            },
            {
                type: 'Separator', template:"<div style='margin-left:500px'></div>"
            },
            {
                tooltipText: 'Diagram View', disabled: false, template: "<input id='diagramView' type='radio'>"
            },
            
            {
                tooltipText: 'Text View', disabled: false, template: "<input id='textView' type='radio' style='margin-left:2px'>"
            },
            {
                type: 'Separator'
            },
            {
                cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
            },
            {
                type: 'Separator'
            },
            {
                type: 'Separator', template:"<div style='margin-left:10px'></div>"
            },
        ];
        return items;
    }
    return DropDownDataSources;
}());