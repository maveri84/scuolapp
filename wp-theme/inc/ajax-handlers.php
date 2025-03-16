
<?php
/**
 * AJAX handlers
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// AJAX handler per la ricerca di studenti
function school_admin_search_students() {
    check_ajax_referer('school-admin-nonce', 'nonce');
    
    $search_term = sanitize_text_field($_POST['search_term']);
    
    $args = array(
        'post_type' => 'studenti',
        'posts_per_page' => 10,
        's' => $search_term,
    );
    
    $results = array();
    $students = new WP_Query($args);
    
    if ($students->have_posts()) {
        while ($students->have_posts()) {
            $students->the_post();
            $results[] = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_permalink(),
                'classe' => get_post_meta(get_the_ID(), '_classe', true),
            );
        }
    }
    
    wp_reset_postdata();
    
    wp_send_json_success($results);
}
add_action('wp_ajax_school_admin_search_students', 'school_admin_search_students');
