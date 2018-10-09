"use strict";

var DataListRenderer = Class.create();

/**
 * Renderer for native datalist elements
 */
DataListRenderer.prototype = {
    /**
     *
     * @param {AutocompleteFields} fields
     * @param {AutocompleteAddressSuggestions} suggestions
     * @param {String} divider
     *
     * @constructor
     */
    initialize: function(fields, suggestions, divider) {
        this.suggestionModel = suggestions;
        this.fieldNames      = fields.getNames();
        this.divider         = divider;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var self             = this,
            fieldId          = $currentField.id,
            suggestionOptions      = this.suggestionModel.getAddressSuggestionOptions(self.fieldNames, self.divider);

        this.removeDatalist($currentField);


        var $dataList = new Element('datalist', {
            'id': 'datalist-' + fieldId
        });

        suggestionOptions.each(function($dataListOption){
            $dataList.insert({
                bottom: $dataListOption
            });
        });

        $currentField.setAttribute('list', 'datalist-' + fieldId);
        $currentField.insert({
            after: $dataList
        });
    },

    /**
     * @private
     * @param {HTMLElement} field
     * @returns {HTMLElement}
     */
    getDatalist: function(field) {
        var fieldId = field.id;

        return $('datalist-' + fieldId)
    },

    /**
     * @param {HTMLElement} field
     */
    removeDatalist: function (field) {
        var datalist = this.getDatalist(field);

        if (datalist) {
            datalist.remove();
        }
    },

    /**
     * @param {HTMLElement} $currentField
     * @return {string}
     */
    getSuggestionUuid: function ($currentField) {
        var fieldValue  = $currentField.value,
            option = $currentField.next('datalist').down("[value='" + fieldValue + "']"),
            optionId = option.identify();

        return optionId;
    }
};
