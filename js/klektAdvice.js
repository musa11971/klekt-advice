var adviceApp = {
    // KLEKT URL regex
    urlRegex: new RegExp('^https:\\/\\/www\\.presentedbyklekt\\.com\\/store\\/.*_i(.*)\\.html$'),

    // Current product inventory
    currentProductInventory: {},

    // Initializes the advice app
    init: function() {
        // Register event listeners for URL input
        $('#klektURLInput').on('change', adviceApp.onURLTextUpdated);
        $('#klektURLInput').on('input', adviceApp.onURLTextUpdated);

        // Call the text update function once, in case the ..
        // .. text from a refresh was persisted
        adviceApp.onURLTextUpdated();

        // Register event listener for when a size is selected
        $('#sizeSelector').change(adviceApp.onSizeSelected);
    },

    // Called when text is entered/update in the URL input
    onURLTextUpdated: function() {
        var klektURLInput = $('#klektURLInput');

        // Get the entered text
        var enteredKlektURL = klektURLInput.val();

        // Hide size selector
        $('#sizeSelector').addClass('hidden');

        // Hide advice
        $('#adviceBox').addClass('hidden');

        // Remove classes
        klektURLInput.removeClass('badKlektURL');
        klektURLInput.removeClass('correctKlektURL');
        klektURLInput.removeAttr('disabled');

        // Nothing entered
        if(!enteredKlektURL.length)
            return false;

        // Link is not a valid KLEKT product URL
        var regexMatches = enteredKlektURL.match(adviceApp.urlRegex);

        if(regexMatches === null || !regexMatches.length) {
            klektURLInput.addClass('badKlektURL');
            return false;
        }

        // The URL is correct
        // Add correct class to input
        klektURLInput.addClass('correctKlektURL');

        // Lock the input
        klektURLInput.attr('disabled', true);

        // Loading text
        var teaserSpan = $('#klektURLTeaser');
        var previousTeaserText = teaserSpan.text();
        teaserSpan.text('loading ...');

        // Make request for sizes
        var productID = regexMatches[1];

        adviceApp.sizeRequest(productID, function(data) {
            // Also retrieve the product inventory
            adviceApp.inventoryRequest(productID, function(invData) {
                adviceApp.currentProductInventory = invData;
            });

            // Set the teaser span back
            teaserSpan.text(previousTeaserText);

            // Enable input
            klektURLInput.removeAttr('disabled');

            // Remove all previous sizes
            $('.customSize').remove();

            // Add all the sizes
            for(var i = 0; i < data.options.length; i++) {
                $('#sizeSelect').append('<option class="customSize" value="' + data.options[i] + '">' + data.options[i] + '</option>');
            }

            // Show size selector
            $('#sizeSelector').removeClass('hidden');
            return true;
        });

        return false;
    },

    // Called when a product size is selected
    onSizeSelected: function() {
        var selectedSize = $('#sizeSelect').val();

        if(!selectedSize.length)
            return false;

        adviceApp.updateAdvice(selectedSize);
        return true;
    },

    // Update the shown advice
    updateAdvice: function(forSize) {
        // Keep retrying if the inventory isn't here yet
        if(adviceApp.currentProductInventory === {}) {
            setTimeout(function() {
                adviceApp.updateAdvice(forSize);
            }, 100);
            return false;
        }

        var adviceBox = $('#adviceBox');

        // Update image
        $('#adviceImg').attr('src', adviceApp.currentProductInventory.imageURL);

        // Update total sellers
        $('#totalItemSellers').text(adviceApp.currentProductInventory.numberAvailableInventory);

        // Update total sellers of this size
        var otherSellersThisSize = adviceApp.currentProductInventory.fallBackInventory[forSize];

        if(otherSellersThisSize !== undefined)
            $('#totalItemSellersThisSize').text(Object.keys(otherSellersThisSize).length);
        else
            $('#totalItemSellersThisSize').text('no');

        if(otherSellersThisSize !== undefined) {
            // Cheapest information
            var cheapestSellerPrice = null;
            var cheapestBuyerPrice = null;

            // Most expensive information
            var expensiveSellerPrice = null;
            var expensiveBuyerPrice = null;

            // Loop through sellers of this item
            for (var key in otherSellersThisSize) {
                if (otherSellersThisSize.hasOwnProperty(key)) {
                    var item = otherSellersThisSize[key];

                    // This is the (new) cheapest item
                    if(cheapestSellerPrice == null || item.basePrice < cheapestSellerPrice) {
                        cheapestSellerPrice = item.basePrice;
                        cheapestBuyerPrice = item.price;
                    }
                    // This is the (new) expensive item
                    if(expensiveSellerPrice == null || item.basePrice > expensiveSellerPrice) {
                        expensiveSellerPrice = item.basePrice;
                        expensiveBuyerPrice = item.price;
                    }
                }
            }

            // Display cheapest
            $('#cheapestThisSizeSeller').text(cheapestSellerPrice);
            $('#cheapestThisSizeBuyer').text(cheapestBuyerPrice);

            // Display expensive
            $('#expensiveThisSizeSeller').text(expensiveSellerPrice);
            $('#expensiveThisSizeBuyer').text(expensiveBuyerPrice);

            // Display quick sell price
            $('#quickSellPrice').text(cheapestSellerPrice - 10);

            $('.onlyWithOtherSellers').show();
        }
        else $('.onlyWithOtherSellers').hide();

        // Show the advice box
        adviceBox.removeClass('hidden');
        return true;
    },

    // Make a request to KLEKT for inventory info
    inventoryRequest: function(prodID, onSuccess) {
        $.get({
            url: 'api-get-inventory.php',
            data: {
                product_id: prodID
            },
            success: function(data) {
                onSuccess(data);
                return true;
            },
            error: function() {
                return false;
            }
        });
    },

    // Make a request to KLEKT for size info
    sizeRequest: function(prodID, onSuccess) {
        $.get({
            url: 'api-get-sizesystem.php',
            data: {
                product_id: prodID
            },
            success: function(data) {
                onSuccess(data);
                return true;
            },
            error: function() {
                return false;
            }
        });
    }
};