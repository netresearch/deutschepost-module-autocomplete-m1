"use strict";

var DatalistSelect = Class.create();

/**
 * Resource model for DatalistSelect objects.
 *
 * @type {{}}
 */
DatalistSelect.prototype = {

    /**
     * Initialize.
     *
     * @param {HTMLElement} $currentForm
     * @param {Object}      observedFields
     * @param {Object}      suggestionModel
     *
     * @constructor
     */
    initialize: function($currentForm, observedFields, suggestionModel) {
        this.form            = $currentForm;
        this.fields          = observedFields;
        this.fieldNames      = observedFields.getNames();
        this.suggestionModel = suggestionModel;
    },

    /**
     * Updates all observed fields.
     *
     * @param {HTMLElement} $currentField
     */
    updateFields: function ($currentField) {
        var self        = this,
            fieldValue  = $currentField.value,
            suggestions = this.suggestionModel,
            option      = $currentField.next('datalist').down("[value='" + fieldValue + "']"),
            optionId    = option.identify(),
            currentSuggestionObject;

        if (optionId) {
            currentSuggestionObject = suggestions.getByUuid(optionId);
        }

        if (currentSuggestionObject && currentSuggestionObject.length) {
            // Fill all fields with response values
            this.fieldNames.each(function(fieldName) {

                // Get data selector with address item
                var field = self.fields.getFieldByName(fieldName);

                if (field && currentSuggestionObject[0][fieldName]) {
                    field.value = currentSuggestionObject[0][fieldName];
                }
            });
        }
    },

    /**
     * Triggers the custom event "autocomplete:datalist-select" on selection of an element from the datalist.
     *
     * @param {HTMLElement} currentField
     */
    receiveSelectEvent: function (currentField) {
        var fieldValue  = currentField.value,
            listId      = currentField.getAttribute('list'),
            $dataList   = $(listId);

        if ($dataList) {
            var option = $dataList.down("[value='" + fieldValue + "']");

            if (option && (option.value === fieldValue)) {
                $(currentField).fire('autocomplete:datalist-select');
            }
        }
    }
};
