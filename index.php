<html>
    <head>
        <title>klekt seller advice</title>

        <link rel="icon" href="img/icon.png">

        <meta charset="UTF-8">
        <meta name="description" content="Generate advice for selling items on KLEKT">
        <meta name="author" content="musa11971">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Main stylesheet -->
        <link rel="stylesheet" href="css/main.css">

        <!-- jQuery -->
        <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>

        <!-- Main script -->
        <script type="text/javascript" src="js/klektAdvice.js"></script>

        <script>
            // Initialize advice app
            $(document).ready(adviceApp.init);
        </script>
    </head>
    <body>
        <div class="text-center">
            <input type="text" id="klektURLInput" placeholder="➡️ enter a KLEKT product url to proceed ⬅️" autofocus />
            <span id="klektURLTeaser">for example: https://www.presentedbyklekt.com/store/nike-x-off-white-zoom-fly-sp-black-2018_i15593.html</span>
        </div>

        <div id="sizeSelector" class="hidden">
            <h3>➡️ select the size you are selling</h3>

            <select id="sizeSelect">
                <option value="">-- select your size --</option>
            </select>
        </div>

        <div id="adviceBox" class="hidden">
            <h3>advice</h3>

            <img src="#" id="adviceImg" />

            <p>there are <strong id="totalItemSellers">...</strong> total sellers for this item</p>
            <p>there are <strong id="totalItemSellersThisSize">...</strong> sellers selling the same size as you</p>
            <p class="onlyWithOtherSellers">
                the cheapest seller for your size is selling for &euro;<strong id="cheapestThisSizeSeller">...</strong>
                <br>
                (total with KLEKT fees: &euro;<strong id="cheapestThisSizeBuyer">...</strong>)
            </p>
            <p class="onlyWithOtherSellers">
                the most expensive seller for your size is selling for &euro;<strong id="expensiveThisSizeSeller">...</strong>
                <br>
                (total with KLEKT fees: &euro;<strong id="expensiveThisSizeBuyer">...</strong>)
            </p>
            <p class="onlyWithOtherSellers">
                if you would like to sell quick, you should list your item for &euro;<strong id="quickSellPrice">...</strong> or lower
                <br>
                (you will be the cheapest seller at that point)
            </p>
        </div>

        <footer>
            IG: <a href="https://www.instagram.com/musa11971/" target="_blank">@musa11971</a> |
            Github: <a href="https://github.com/musa11971/klekt-advice" target="_blank">musa11971/klekt-advice</a> |
            <a href="disclaimer.php">disclaimer</a>
        </footer>
    </body>
</html>