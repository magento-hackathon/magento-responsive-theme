document.observe('dom:loaded', function() {
    
    var hideSidebarItemsForPhones = function(selector) {
        var sidebarItems = $$(selector);
        sidebarItems.each(function(item, index) {
            if(index > 0) {
                item.toggleClassName('hidden-phone');
            }
        });        
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
    }
    
    //navbar toggle navigation visibility
    var navbarCollapsible;
    $$('.navbar .btn-navbar').each(function(navbarButton) {
        navbarButton.observe('click', function(e) {
            new Event(e).stop();
            navbarCollapsible = navbarButton.up('.container').select('.nav-collapse')[0];
            
            navbarCollapsible.setStyle({
                height: (parseInt(navbarCollapsible.getStyle('height')) == 0 ? 'auto' : 0)
            });
        });
    });

    //categories modal box
    if($('categories-show-modal') && $('category-nav')) {
        var categoryNavigation = $('category-nav');
        $('categories-show-modal').observe('click', function(ev) {
            categoryNavigation
                .addClassName('modal')
                .addClassName('active');
        });
    }
});
