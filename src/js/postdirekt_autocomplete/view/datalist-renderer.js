"use strict";

var DataListRenderer = Class.create();

/**
 * Renderer for native datalist elements
 */
DataListRenderer.prototype = {
    /**
     * @param {AutocompleteAddressSuggestions}
     */
    suggestions: {},

    /**
     * @param {string}
     */
    divider: '',

    /**
     * @param {AutocompleteAddressSuggestions} suggestions
     * @param {string} divider
     *
     * @constructor
     */
    initialize: function(suggestions, divider) {
        this.suggestions = suggestions;
        this.divider         = divider;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var fieldId = $currentField.id,
            suggestionOptions = this.suggestions.getAddressSuggestionOptions(this.divider);

        this.removeDatalist($currentField);

        var $dataList = new Element('datalist', {id: 'datalist-' + fieldId});
        suggestionOptions.each(function(option){
            var $option = Element('option', {id: option.id, value: option.title});
            $dataList.insert({bottom: $option});
        });

        $currentField.setAttribute('list', 'datalist-' + fieldId);
        $currentField.insert({
            after: $dataList
        });

        /**
         * Watch for datalist item selects and trigger datalist-select event.
         */
        $currentField.observe('input', function (e) {
            var option = $dataList.down("[value='" + e.target.value + "']");
            if (option && option.value === e.target.value) {
                e.target.fire('autocomplete:datalist-select');
            }
        }.bind(this));
    },

    /**
     * Remove the datalist from the DOM and stop observers.
     *
     * @param {HTMLElement} field
     */
    removeDatalist: function (field) {
        var datalist = $('datalist-' + field.id);

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
            option = $currentField.next('datalist').down("[value='" + fieldValue + "']");

        return option.id;
    }
};
