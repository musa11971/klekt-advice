<?php

header('Content-Type: application/json');

if(!isset($_GET['product_id'])) die;

echo file_get_contents('https://www.presentedbyklekt.com/api/product/get-sizesystem/?product_id=' . $_GET['product_id']);