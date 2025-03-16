
<?php
/**
 * Shortcodes
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Shortcode per mostrare il conteggio degli studenti
function school_admin_student_count_shortcode($atts) {
    $atts = shortcode_atts(array(
        'classe' => '',
    ), $atts, 'student_count');
    
    $args = array(
        'post_type' => 'studenti',
        'posts_per_page' => -1,
    );
    
    if (!empty($atts['classe'])) {
        $args['meta_query'] = array(
            array(
                'key' => '_classe',
                'value' => $atts['classe'],
                'compare' => '='
            )
        );
    }
    
    $students = new WP_Query($args);
    
    return $students->found_posts;
}
add_shortcode('student_count', 'school_admin_student_count_shortcode');

// Funzione per generare un certificato in PDF (esempio fittizio)
function school_admin_generate_certificate_pdf($certificate_id) {
    // In una implementazione reale, qui si userebbe una libreria come FPDF o TCPDF
    // per generare un vero PDF con i dati del certificato
    
    // Per ora, simula solo il processo di generazione
    update_post_meta($certificate_id, '_generated', 'yes');
    update_post_meta($certificate_id, '_generation_date', current_time('mysql'));
    
    return true;
}
