
<?php
/**
 * Database functions
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Crea tabelle personalizzate per dati complessi
function school_admin_create_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();
    
    // Tabella per le presenze
    $table_presenze = $wpdb->prefix . 'presenze';
    $sql = "CREATE TABLE $table_presenze (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        studente_id mediumint(9) NOT NULL,
        data date NOT NULL,
        stato varchar(20) NOT NULL,
        note text,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    // Tabella per i voti
    $table_voti = $wpdb->prefix . 'voti';
    $sql2 = "CREATE TABLE $table_voti (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        studente_id mediumint(9) NOT NULL,
        materia_id mediumint(9) NOT NULL,
        data date NOT NULL,
        voto float NOT NULL,
        tipo varchar(50) NOT NULL,
        note text,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    dbDelta($sql2);
}
register_activation_hook(__FILE__, 'school_admin_create_tables');

// Verifica se le tabelle esistono durante l'attivazione del tema
function school_admin_theme_activation() {
    school_admin_create_tables();
}
add_action('after_switch_theme', 'school_admin_theme_activation');
