document.observe('dom:loaded', function() {
    
    var hideSidebarItemsForPhones = function(selector) {
        var sidebarItems = $$(selector);
        sidebarItems.each(function(item, index) {
            if(index > 0) {
                item.toggleClassName('hidden-phone');
            }
        });        
    }
    
    var swapColumns = function() {
        if(currentLayoutState == 'narrow') {
            $$('.col-main')[0].insert({after: $$('.col-left')[0].outerHTML});
            $$('.col-left')[0].remove();
        } else {
            $$('.col-main')[0].insert({before: $$('.col-left')[0].outerHTML});
            $$('.col-left')[1].remove();
        }
    }
    
    hideSidebarItemsForPhones('.col-left > div');
    hideSidebarItemsForPhones('.col-right > div');
    
    var moreTranslation = Translator.translate('more');
    var lessTranslation = Translator.translate('less');
    
    var sidebarShowMore = $('sidebar-show-more');
    
    if(sidebarShowMore) {
        sidebarShowMore.observe('click', function(ev) {
            hideSidebarItemsForPhones('.col-left > div');
            hideSidebarItemsForPhones('.col-right > div');
            
            /**
             * @todo check for availability of Translator Object
             */
            this.innerHTML = this.innerHTML  == lessTranslation ? moreTranslation : lessTranslation;
        });
        
        var previousLayoutState = sidebarShowMore.getStyle('display') == 'none' ? 'wide' : 'narrow';
        var currentLayoutState = previousLayoutState;
        
        swapColumns();
        
        window.onresize = function() {
            previousLayoutState = currentLayoutState;
            currentLayoutState = sidebarShowMore.getStyle('display') == 'none' ? 'wide' : 'narrow';
            
            if(previousLayoutState != currentLayoutState) {
                swapColumns();
            }
        };
    }
});