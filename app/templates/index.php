<?php
require_once __DIR__.'/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);
$app = new Silex\Application();

$app['debug'] = true;

$app->get('/', function() use($app, $twig) {
  return $twig->render('home.twig', array('title' => 'home'));
});

$app->get('/{page}', function($page) use($app, $twig) {
  return $twig->render($page . '.twig', array('title' => $page));
});

$app->run();