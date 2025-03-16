
<?php
/**
 * Custom Post Types and Taxonomies
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Registra i custom post types
function school_admin_register_post_types() {
    // Custom Post Type per Studenti
    register_post_type('studenti', array(
        'labels' => array(
            'name' => __('Studenti', 'school-admin'),
            'singular_name' => __('Studente', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Studente', 'school-admin'),
            'edit_item' => __('Modifica Studente', 'school-admin'),
            'new_item' => __('Nuovo Studente', 'school-admin'),
            'view_item' => __('Visualizza Studente', 'school-admin'),
            'search_items' => __('Cerca Studenti', 'school-admin'),
            'not_found' => __('Nessuno studente trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessuno studente trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups',
        'menu_position' => 5,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'studenti')
    ));
    
    // Custom Post Type per Docenti
    register_post_type('docenti', array(
        'labels' => array(
            'name' => __('Docenti', 'school-admin'),
            'singular_name' => __('Docente', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Docente', 'school-admin'),
            'edit_item' => __('Modifica Docente', 'school-admin'),
            'new_item' => __('Nuovo Docente', 'school-admin'),
            'view_item' => __('Visualizza Docente', 'school-admin'),
            'search_items' => __('Cerca Docenti', 'school-admin'),
            'not_found' => __('Nessun docente trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun docente trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-welcome-learn-more',
        'menu_position' => 6,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'docenti')
    ));
    
    // Custom Post Type per Certificati
    register_post_type('certificati', array(
        'labels' => array(
            'name' => __('Certificati', 'school-admin'),
            'singular_name' => __('Certificato', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Certificato', 'school-admin'),
            'edit_item' => __('Modifica Certificato', 'school-admin'),
            'new_item' => __('Nuovo Certificato', 'school-admin'),
            'view_item' => __('Visualizza Certificato', 'school-admin'),
            'search_items' => __('Cerca Certificati', 'school-admin'),
            'not_found' => __('Nessun certificato trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun certificato trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-media-document',
        'menu_position' => 7,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'certificati')
    ));
    
    // Custom Post Type per Protocollo
    register_post_type('protocollo', array(
        'labels' => array(
            'name' => __('Protocollo', 'school-admin'),
            'singular_name' => __('Protocollo', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Protocollo', 'school-admin'),
            'edit_item' => __('Modifica Protocollo', 'school-admin'),
            'new_item' => __('Nuovo Protocollo', 'school-admin'),
            'view_item' => __('Visualizza Protocollo', 'school-admin'),
            'search_items' => __('Cerca Protocolli', 'school-admin'),
            'not_found' => __('Nessun protocollo trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun protocollo trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-clipboard',
        'menu_position' => 8,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'protocollo')
    ));
    
    // Registra le tassonomie
    register_taxonomy(
        'classe',
        'studenti',
        array(
            'labels' => array(
                'name' => __('Classi', 'school-admin'),
                'singular_name' => __('Classe', 'school-admin'),
                'search_items' => __('Cerca Classi', 'school-admin'),
                'all_items' => __('Tutte le Classi', 'school-admin'),
                'edit_item' => __('Modifica Classe', 'school-admin'),
                'update_item' => __('Aggiorna Classe', 'school-admin'),
                'add_new_item' => __('Aggiungi Nuova Classe', 'school-admin'),
                'new_item_name' => __('Nuova Classe', 'school-admin'),
                'menu_name' => __('Classi', 'school-admin'),
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'classe'),
            'show_in_rest' => true,
        )
    );
    
    register_taxonomy(
        'materia',
        array('docenti', 'studenti'),
        array(
            'labels' => array(
                'name' => __('Materie', 'school-admin'),
                'singular_name' => __('Materia', 'school-admin'),
                'search_items' => __('Cerca Materie', 'school-admin'),
                'all_items' => __('Tutte le Materie', 'school-admin'),
                'edit_item' => __('Modifica Materia', 'school-admin'),
                'update_item' => __('Aggiorna Materia', 'school-admin'),
                'add_new_item' => __('Aggiungi Nuova Materia', 'school-admin'),
                'new_item_name' => __('Nuova Materia', 'school-admin'),
                'menu_name' => __('Materie', 'school-admin'),
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'materia'),
            'show_in_rest' => true,
        )
    );
}
add_action('init', 'school_admin_register_post_types');
