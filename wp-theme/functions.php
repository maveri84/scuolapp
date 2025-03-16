
<?php
/**
 * School Administration System functions and definitions
 * 
 * This file serves as an entry point that includes all the modular function files
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Definisci il percorso dei file di include
define('SCHOOL_ADMIN_INC_DIR', get_template_directory() . '/inc');

// Include i file principali del tema
require_once SCHOOL_ADMIN_INC_DIR . '/setup.php';           // Funzioni di setup del tema
require_once SCHOOL_ADMIN_INC_DIR . '/post-types.php';      // Custom Post Types
require_once SCHOOL_ADMIN_INC_DIR . '/metaboxes.php';       // Metaboxes
require_once SCHOOL_ADMIN_INC_DIR . '/meta-handlers.php';   // Gestori di metadati
require_once SCHOOL_ADMIN_INC_DIR . '/database.php';        // Creazione tabelle e funzioni DB
require_once SCHOOL_ADMIN_INC_DIR . '/admin-pages.php';     // Pagine di amministrazione
require_once SCHOOL_ADMIN_INC_DIR . '/shortcodes.php';      // Shortcodes
require_once SCHOOL_ADMIN_INC_DIR . '/ajax-handlers.php';   // AJAX handlers
require_once SCHOOL_ADMIN_INC_DIR . '/csv-import.php';      // Funzionalità di importazione CSV

/**
 * Fissa per la creazione delle tabelle durante l'attivazione del tema
 * Nella versione refactored abbiamo spostato il codice in database.php,
 * ma dobbiamo correggere il register_activation_hook che richiede __FILE__ come riferimento
 */
function school_admin_fix_tables_activation() {
    register_activation_hook(__FILE__, 'school_admin_create_tables');
}
school_admin_fix_tables_activation();
