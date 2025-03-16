
<?php
// Pagina di gestione presenze
if (!current_user_can('manage_options')) {
    wp_die(__('Non hai i permessi per accedere a questa pagina.', 'school-admin'));
}

global $wpdb;
$table_presenze = $wpdb->prefix . 'presenze';

// Gestione form invio
if (isset($_POST['submit_presenze']) && isset($_POST['_wpnonce']) && wp_verify_nonce($_POST['_wpnonce'], 'salva_presenze')) {
    $studente_id = intval($_POST['studente_id']);
    $data = sanitize_text_field($_POST['data']);
    $stato = sanitize_text_field($_POST['stato']);
    $note = sanitize_textarea_field($_POST['note']);
    
    $wpdb->insert(
        $table_presenze,
        array(
            'studente_id' => $studente_id,
            'data' => $data,
            'stato' => $stato,
            'note' => $note
        ),
        array('%d', '%s', '%s', '%s')
    );
    
    echo '<div class="notice notice-success is-dismissible"><p>'.__('Presenza registrata con successo!', 'school-admin').'</p></div>';
}

// Query per ottenere le presenze
$presenze = $wpdb->get_results("SELECT p.*, s.post_title as studente_nome 
                               FROM $table_presenze p
                               LEFT JOIN {$wpdb->posts} s ON p.studente_id = s.ID
                               WHERE s.post_type = 'studenti'
                               ORDER BY p.data DESC
                               LIMIT 30");

// Ottieni elenco studenti per select
$studenti = get_posts(array(
    'post_type' => 'studenti',
    'numberposts' => -1,
    'orderby' => 'title',
    'order' => 'ASC'
));
?>

<div class="wrap school-admin-presenze">
    <h1><?php _e('Gestione Presenze', 'school-admin'); ?></h1>
    
    <div class="card mb-6">
        <h2 class="text-lg font-bold mb-4"><?php _e('Registra Nuova Presenza', 'school-admin'); ?></h2>
        
        <form method="post" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <?php wp_nonce_field('salva_presenze'); ?>
            
            <div>
                <label for="studente_id" class="block mb-2"><?php _e('Studente', 'school-admin'); ?></label>
                <select id="studente_id" name="studente_id" class="w-full p-2 border rounded" required>
                    <option value=""><?php _e('Seleziona studente...', 'school-admin'); ?></option>
                    <?php foreach ($studenti as $studente) : ?>
                        <option value="<?php echo $studente->ID; ?>"><?php echo $studente->post_title; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <div>
                <label for="data" class="block mb-2"><?php _e('Data', 'school-admin'); ?></label>
                <input type="date" id="data" name="data" class="w-full p-2 border rounded" value="<?php echo date('Y-m-d'); ?>" required>
            </div>
            
            <div>
                <label for="stato" class="block mb-2"><?php _e('Stato Presenza', 'school-admin'); ?></label>
                <select id="stato" name="stato" class="w-full p-2 border rounded" required>
                    <option value="presente"><?php _e('Presente', 'school-admin'); ?></option>
                    <option value="assente"><?php _e('Assente', 'school-admin'); ?></option>
                    <option value="ritardo"><?php _e('Ritardo', 'school-admin'); ?></option>
                    <option value="uscita_anticipata"><?php _e('Uscita Anticipata', 'school-admin'); ?></option>
                </select>
            </div>
            
            <div class="md:col-span-2">
                <label for="note" class="block mb-2"><?php _e('Note', 'school-admin'); ?></label>
                <textarea id="note" name="note" class="w-full p-2 border rounded" rows="3"></textarea>
            </div>
            
            <div class="md:col-span-2">
                <button type="submit" name="submit_presenze" class="button">
                    <i class="fas fa-save mr-2"></i> <?php _e('Salva Presenza', 'school-admin'); ?>
                </button>
            </div>
        </form>
    </div>
    
    <div class="card">
        <h2 class="text-lg font-bold mb-4"><?php _e('Ultime Presenze Registrate', 'school-admin'); ?></h2>
        
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th><?php _e('ID', 'school-admin'); ?></th>
                        <th><?php _e('Studente', 'school-admin'); ?></th>
                        <th><?php _e('Data', 'school-admin'); ?></th>
                        <th><?php _e('Stato', 'school-admin'); ?></th>
                        <th><?php _e('Note', 'school-admin'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($presenze) : ?>
                        <?php foreach ($presenze as $presenza) : ?>
                            <tr>
                                <td><?php echo $presenza->id; ?></td>
                                <td>
                                    <a href="<?php echo get_edit_post_link($presenza->studente_id); ?>" class="text-blue-600 hover:underline">
                                        <?php echo $presenza->studente_nome; ?>
                                    </a>
                                </td>
                                <td><?php echo date_i18n('d/m/Y', strtotime($presenza->data)); ?></td>
                                <td>
                                    <?php 
                                    $stato_class = '';
                                    $stato_label = '';
                                    
                                    switch ($presenza->stato) {
                                        case 'presente':
                                            $stato_class = 'bg-green-100 text-green-800';
                                            $stato_label = __('Presente', 'school-admin');
                                            break;
                                        case 'assente':
                                            $stato_class = 'bg-red-100 text-red-800';
                                            $stato_label = __('Assente', 'school-admin');
                                            break;
                                        case 'ritardo':
                                            $stato_class = 'bg-yellow-100 text-yellow-800';
                                            $stato_label = __('Ritardo', 'school-admin');
                                            break;
                                        case 'uscita_anticipata':
                                            $stato_class = 'bg-blue-100 text-blue-800';
                                            $stato_label = __('Uscita Anticipata', 'school-admin');
                                            break;
                                    }
                                    ?>
                                    <span class="px-2 py-1 rounded-full text-xs <?php echo $stato_class; ?>">
                                        <?php echo $stato_label; ?>
                                    </span>
                                </td>
                                <td><?php echo $presenza->note; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="5" class="text-center py-4"><?php _e('Nessuna presenza registrata', 'school-admin'); ?></td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
