
<?php
/**
 * CSV Import functionality
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Aggiungi supporto per l'importazione di studenti da CSV
function school_admin_handle_csv_import() {
    if (isset($_POST['action']) && $_POST['action'] === 'import_students' && 
        isset($_FILES['student_csv']) && 
        isset($_POST['csv_nonce']) && 
        wp_verify_nonce($_POST['csv_nonce'], 'import_students_csv')) {
        
        $file = $_FILES['student_csv'];
        
        if ($file['error'] > 0) {
            wp_die('Errore nel caricamento del file: ' . $file['error']);
            return;
        }
        
        if (pathinfo($file['name'], PATHINFO_EXTENSION) !== 'csv') {
            wp_die('Il file deve essere in formato CSV');
            return;
        }
        
        $handle = fopen($file['tmp_name'], 'r');
        
        // Ignora la prima riga (intestazioni)
        fgetcsv($handle, 1000, ',');
        
        $imported = 0;
        
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            if (count($data) < 5) {
                continue;
            }
            
            $nome = sanitize_text_field($data[0]);
            $classe = sanitize_text_field($data[1]);
            $email = sanitize_email($data[2]);
            $telefono = sanitize_text_field($data[3]);
            $data_nascita = sanitize_text_field($data[4]);
            
            $post_id = wp_insert_post(array(
                'post_title' => $nome,
                'post_type' => 'studenti',
                'post_status' => 'publish',
            ));
            
            if ($post_id) {
                update_post_meta($post_id, '_classe', $classe);
                update_post_meta($post_id, '_email', $email);
                update_post_meta($post_id, '_telefono', $telefono);
                update_post_meta($post_id, '_data_nascita', $data_nascita);
                
                $imported++;
            }
        }
        
        fclose($handle);
        
        wp_redirect(admin_url('edit.php?post_type=studenti&imported=' . $imported));
        exit;
    }
}
add_action('admin_init', 'school_admin_handle_csv_import');

// Aggiungi notifiche di avviso per importazione CSV
function school_admin_admin_notices() {
    if (isset($_GET['imported']) && $_GET['imported'] > 0) {
        $count = intval($_GET['imported']);
        printf('<div class="notice notice-success is-dismissible"><p>' . __('Importati %d studenti con successo!', 'school-admin') . '</p></div>', $count);
    }
}
add_action('admin_notices', 'school_admin_admin_notices');
