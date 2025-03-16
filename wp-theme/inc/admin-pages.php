
<?php
/**
 * Custom admin pages
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Aggiungi pagine di amministrazione personalizzate
function school_admin_menu_pages() {
    add_menu_page(
        __('Dashboard Scuola', 'school-admin'),
        __('Dashboard Scuola', 'school-admin'),
        'manage_options',
        'school-admin-dashboard',
        'school_admin_dashboard_page',
        'dashicons-welcome-learn-more',
        3
    );
    
    add_submenu_page(
        'school-admin-dashboard',
        __('Registro Presenze', 'school-admin'),
        __('Registro Presenze', 'school-admin'),
        'manage_options',
        'school-admin-presenze',
        'school_admin_presenze_page'
    );
    
    add_submenu_page(
        'school-admin-dashboard',
        __('Gestione Voti', 'school-admin'),
        __('Gestione Voti', 'school-admin'),
        'manage_options',
        'school-admin-voti',
        'school_admin_voti_page'
    );
}
add_action('admin_menu', 'school_admin_menu_pages');

// Funzione per la pagina Dashboard
function school_admin_dashboard_page() {
    include(get_template_directory() . '/admin/dashboard.php');
}

// Funzione per la pagina Presenze
function school_admin_presenze_page() {
    include(get_template_directory() . '/admin/presenze.php');
}

// Funzione per la pagina Voti
function school_admin_voti_page() {
    include(get_template_directory() . '/admin/voti.php');
}
