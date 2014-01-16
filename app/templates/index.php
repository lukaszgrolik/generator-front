<?php
require_once __DIR__.'/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);
$app = new Silex\Application();

$app['debug'] = true;

$app->get('/{page}', function($page) use($app, $twig) {
  return $twig->render($page . '.twig', array('title' => $page));
})
->value('page', 'home');

$app->run();