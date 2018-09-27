"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {
    /**
     * @property {int} typingDelay
     */
    typingDelay: 300,

    /**
     * @property {string} timeoutId
     */
    timeoutId: null,

    /**
     * @property {string} addressItemDivider
     */
    addressItemDivider: ', ',

    /**
     * @property {AutocompleteFields} addressFields
     */
    addressFields: null,

    /**
     * @property {SearchRequest} searchRequest
     */
    searchRequest: null,

    /**
     * @property {SelectRequest} selectRequest
     */
    selectRequest: null,

    /**
     * @property {AutocompleteAddressSuggestions} addressSuggestions
     */
    addressSuggestions: null,

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData: null,

    /**
     * @property {FieldInput} fieldInputAction
     */
    fieldInputAction: null,

    /**
     * @property {DataListRenderer} datalistRenderer
     */
    datalistRenderer: null,

    /**
     * @property {DatalistSelect} datalistSelectAction
     */
    datalistSelectAction: null,

    /**
     * @property {CountrySelect} countrySelect
     */
    countrySelect: null,

    /**
     * @param {string} formId
     * @param {string} searchUrl
     * @param {string} respondUrl
     * @param {Object}  watchedFieldIds
     *
     * @constructor
     */
    initialize: function (formId, searchUrl, respondUrl, watchedFieldIds) {
        var form                   = $(formId);
        this.addressFields          = new AutocompleteFields(form, watchedFieldIds);
        this.searchRequest          = new SearchRequest(searchUrl);
        this.selectRequest          = new SelectRequest(respondUrl);
        this.addressSuggestions     = new AutocompleteAddressSuggestions({});
        this.addressData            = new AutocompleteAddressData({});
        this.fieldInputAction       = new FieldInput(this.addressFields, this.addressData);
        this.datalistRenderer       = new DataListRenderer(this.addressFields, this.addressSuggestions, this.addressItemDivider);
        this.datalistSelectAction   = new DatalistSelect(this.addressFields, this.addressSuggestions);
        this.countrySelect          = new CountrySelect(form);

        this.loadPrefilledValues();
        this.listenFields();
        this.removeListOnCountryChange();
    },

    /**
     * Writes existing field values into object
     *
     * @private
     */
    loadPrefilledValues: function () {
        this.addressFields.getFields().each(function(field) {
            if (field.value && field.length) {
                this.addressData.setDataValue(field.name, field.value);
            }
        });
    },

    /**
     * Adds listeners to observed address fields
     *
     * @private
     */
    listenFields: function () {
        var self = this;

        this.addressFields.getIds().each(function(fieldId) {
            var fieldItem = self.addressFields.getFieldById(fieldId);

            // Set field name as data attribute to prevent problems with colon selectors
            fieldItem.setAttribute('data-address-item', fieldId);

            // Watch key strokes
            fieldItem
                .observe('keyup', function (e) {
                    // Update address object
                    self.fieldInputAction.doInputAction(e.target);
                    // Run address search with timeout
                    self.triggerDelayedCallback(function () {
                        self.searchAction(e.target);
                    });
                });

            fieldItem
                .observe('focus', function (e) {
                    // Update address object
                    self.fieldInputAction.doInputAction(e.target);
                    // Run address search with timeout
                    self.triggerDelayedCallback(function () {
                        self.searchAction(e.target);
                    });
                });

            // Watch input value changes
            fieldItem
                .observe('input', function (e) {
                     // Run actions after datalist changes
                    if (self.datalistSelectAction.detectSelectEvent(e.target)) {
                        e.target.fire('autocomplete:datalist-select');
                    }
                });

            // Watch suggestion selection
            fieldItem
                .observe('autocomplete:datalist-select', function (e) {
                    // Remove focus after selection, preventing chrome from re-showing the datalist again
                    e.target.blur();

                    // Update all observed fields after item was selected in datalist
                    self.datalistSelectAction.updateFields(e.target);
                    self.selectAction();
                });
        });
    },

    /**
     * Triggers an delayed callback.
     *
     * @private
     * @param {Function} callback Callback to execute after timeout
     * @param {int}      delay    Delay in milliseconds
     */
    triggerDelayedCallback: function (callback, delay) {
        delay = delay || this.typingDelay;

        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    },

    /**
     * Executes a search request.
     *
     * @private
     * @param {HTMLElement} $currentField
     */
    searchAction: function ($currentField) {
        if (this.addressData.isEmpty()) {
            return;
        }

        if (this.countrySelect.isGermany) {
            this.searchRequest.doSearchRequest(this.addressData.getData(), function (json) {
                this.addressSuggestions.setAddressSuggestions(json);
                this.datalistRenderer.render($currentField);
            }.bind(this));
        }

    },

    /**
     * Executes a select request.
     *
     * @private
     */
    selectAction: function () {
        var selectedSuggestion = this.datalistSelectAction.getCurrentSuggestion();

        if (!selectedSuggestion || !selectedSuggestion.uuid) {
            throw 'Missing required field <uuid>';
        }

        this.selectRequest.doSelectRequest(selectedSuggestion);
    },

    /**
     * Remove all datalists when country is not Germany.
     *
     * @private
     */
    removeListOnCountryChange: function () {
        this.countrySelect.listenOnChange(function (isGermany) {
            if (!isGermany) {
                this.addressFields.getFields().each(function (field) {
                    this.datalistRenderer.removeDatalist(field);
                }.bind(this));
            }
        }.bind(this));
    }
};
