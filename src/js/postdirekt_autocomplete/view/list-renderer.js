"use strict";

var ListRenderer = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
ListRenderer.prototype = {
    field: null,
    currentDataList: null,

    /**
     * @constructor
     */
    initialize: function(field) {
        this.field           = field;
        this.currentDataList = $('datalist-'+ this.field.id);
    },

    /**
     * Renders the datalist.
     *
     * @param {Array} suggestions
     * @param {Array} fieldNames
     * @param {String} divider
     */
    render: function (suggestions, fieldNames, divider) {
        var self = this;
        this.suggestions = suggestions;

        if (this.currentDataList) {

            this.currentDataList.remove();
        }
        var $dataList = new Element('ul', {
            'id': 'datalist-' + this.field.id,
            'class' : 'datalist',
            'style' : 'width:'+ this.field.offsetWidth +'px'
        });

        for (var i = 0; i < this.suggestions.length; ++i) {
            var $dataListOption  = new Element('li', {
                    'id': this.suggestions[i].uuid
                }),
                addressData = '',
                initLoop = false;

            // Combine all address items to suggestion string, divided by divider
            for (var fieldName in fieldNames) {
                if (this.suggestions[i][fieldName]) {
                    // Add divider in front of all items but first
                    if (!initLoop) {
                        initLoop = true;
                    } else {
                        addressData += divider;
                    }
                    addressData += this.suggestions[i][fieldName];
                }
            }

            $dataListOption.innerHTML = addressData;
            $dataListOption.setAttribute('data-value', addressData);

            $dataList.insert({
                bottom: $dataListOption
            });
        }



        this.field.setAttribute('list', 'datalist-' + this.field.id);
        this.field.insert({
            after: $dataList
        });

        this.listen(this.field, 'blur', function(){
            $dataList.style.display = 'none'
        });

        this.listen($dataList, 'mousedown', function (evt) {
            self.itemSelect(evt.target);
        });
        this.listen(this.field, 'keydown', function (e) {
            var list = $dataList.childElements();
            /*if (!$dataList.childElements().length) {
               return;
            }*/
            var isUp = e.keyCode == 38;
            var isDown = e.keyCode == 40;

            var activeItem = $dataList.querySelector(".active");
            if (isDown || isUp) {
                var firstItem = list[0];

                if( isDown && !activeItem ) {
                    firstItem.className = 'active';
                } else if(activeItem){
                    var prevVisible = null;
                    var nextVisible = null;

                    for( var i = 0; i < list.length; i++ ) {
                        var visItem = list[i];
                        if( visItem == activeItem ) {
                            prevVisible = list[i-1];
                            nextVisible = list[i+1];
                            break;
                        }
                    }

                    activeItem.className = '';
                    if ( isUp ) {
                        if( prevVisible ) {
                            prevVisible.className = 'active';
                            if ( prevVisible.offsetTop < $dataList.scrollTop ) {
                                $dataList.scrollTop -= prevVisible.offsetHeight;
                            }
                        } else {
                            list[list.length - 1].className = 'active';
                        }
                    }
                    if ( isDown ) {
                        if( nextVisible ) {
                            nextVisible.className = 'active';
                        } else {
                            $dataList.childElements()[0].className = 'active';
                        }
                    }
                }
            }
            // return or tab key
            if ( activeItem && (e.keyCode == 13 || e.keyCode == 9) ){
                self.itemSelect(activeItem);
            }

        })
    },

    listen: function(elem, event, func) {
        if( elem.addEventListener ) {
            elem.addEventListener(event, func, false);
        } else {
            elem.attachEvent('on' + event, func);
        }
    },

    itemSelect: function (item) {
        this.field.value = item.dataset.value;
        this.triggerEvent(this.field, 'blur');
        this.field.observe('autocomplete:datalist-select', function (event) {
            console.log('Hallo');
        });
        Event.fire(this.field, 'autocomplete:datalist-select');
    },

    triggerEvent: function(elem, eventType) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventType, true, true);
            elem.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            event.eventType = eventType;
            elem.fireEvent("on" + eventType, event);
        }
    }
};
