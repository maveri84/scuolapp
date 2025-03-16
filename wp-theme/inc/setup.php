
<?php
/**
 * Theme setup functions
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Setup del tema
function school_admin_setup() {
    // Aggiungi supporto per il titolo del sito
    add_theme_support('title-tag');
    
    // Aggiungi supporto per le immagini in evidenza
    add_theme_support('post-thumbnails');
    
    // Supporto per HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style',
    ));
    
    // Supporto per il logo personalizzato
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 100,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // Registra menu di navigazione
    register_nav_menus(array(
        'primary' => __('Menu principale', 'school-admin'),
        'sidebar' => __('Menu laterale', 'school-admin')
    ));
    
    // Registra dimensioni personalizzate per le immagini
    add_image_size('profile-thumbnail', 150, 150, true);
}
add_action('after_setup_theme', 'school_admin_setup');

// Registra stili e script
function school_admin_scripts() {
    // Stili principali
    wp_enqueue_style('school-admin-style', get_stylesheet_uri(), array(), '1.0.1');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Font Awesome per le icone
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', array(), '6.0.0');
    
    // Script principali
    wp_enqueue_script('school-admin-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0.1', true);
    
    // Passa i dati al JS
    wp_localize_script('school-admin-script', 'schoolAdmin', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('school-admin-nonce'),
        'site_url' => site_url(),
        'theme_url' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'school_admin_scripts');

// Registra i widget personalizzati
function school_admin_register_widgets() {
    register_sidebar(array(
        'name'          => __('Sidebar del Dashboard', 'school-admin'),
        'id'            => 'sidebar-dashboard',
        'description'   => __('Widget per la sidebar del dashboard', 'school-admin'),
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'school_admin_register_widgets');
