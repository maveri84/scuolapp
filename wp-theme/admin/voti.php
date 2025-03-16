
<?php
// Pagina di gestione dei voti
if (!current_user_can('manage_options')) {
    wp_die(__('Non hai i permessi per accedere a questa pagina.', 'school-admin'));
}

global $wpdb;
$table_voti = $wpdb->prefix . 'voti';

// Gestione form invio
if (isset($_POST['submit_voto']) && isset($_POST['_wpnonce']) && wp_verify_nonce($_POST['_wpnonce'], 'salva_voto')) {
    $studente_id = intval($_POST['studente_id']);
    $materia_id = intval($_POST['materia_id']);
    $data = sanitize_text_field($_POST['data']);
    $voto = floatval($_POST['voto']);
    $tipo = sanitize_text_field($_POST['tipo']);
    $note = sanitize_textarea_field($_POST['note']);
    
    $wpdb->insert(
        $table_voti,
        array(
            'studente_id' => $studente_id,
            'materia_id' => $materia_id,
            'data' => $data,
            'voto' => $voto,
            'tipo' => $tipo,
            'note' => $note
        ),
        array('%d', '%d', '%s', '%f', '%s', '%s')
    );
    
    echo '<div class="notice notice-success is-dismissible"><p>'.__('Voto registrato con successo!', 'school-admin').'</p></div>';
}

// Query per ottenere i voti
$voti = $wpdb->get_results("SELECT v.*, s.post_title as studente_nome, m.post_title as materia_nome 
                           FROM $table_voti v
                           LEFT JOIN {$wpdb->posts} s ON v.studente_id = s.ID
                           LEFT JOIN {$wpdb->posts} m ON v.materia_id = m.ID
                           WHERE s.post_type = 'studenti'
                           ORDER BY v.data DESC
                           LIMIT 30");

// Ottieni elenco studenti per select
$studenti = get_posts(array(
    'post_type' => 'studenti',
    'numberposts' => -1,
    'orderby' => 'title',
    'order' => 'ASC'
));

// Ottieni elenco materie per select (simulazione)
$materie = array(
    array('ID' => 1, 'post_title' => 'Matematica'),
    array('ID' => 2, 'post_title' => 'Italiano'),
    array('ID' => 3, 'post_title' => 'Storia'),
    array('ID' => 4, 'post_title' => 'Geografia'),
    array('ID' => 5, 'post_title' => 'Scienze'),
    array('ID' => 6, 'post_title' => 'Inglese'),
    array('ID' => 7, 'post_title' => 'Arte'),
    array('ID' => 8, 'post_title' => 'Educazione Fisica')
);
?>

<div class="wrap school-admin-voti">
    <h1><?php _e('Gestione Voti', 'school-admin'); ?></h1>
    
    <div class="card mb-6">
        <h2 class="text-lg font-bold mb-4"><?php _e('Registra Nuovo Voto', 'school-admin'); ?></h2>
        
        <form method="post" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <?php wp_nonce_field('salva_voto'); ?>
            
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
                <label for="materia_id" class="block mb-2"><?php _e('Materia', 'school-admin'); ?></label>
                <select id="materia_id" name="materia_id" class="w-full p-2 border rounded" required>
                    <option value=""><?php _e('Seleziona materia...', 'school-admin'); ?></option>
                    <?php foreach ($materie as $materia) : ?>
                        <option value="<?php echo $materia['ID']; ?>"><?php echo $materia['post_title']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <div>
                <label for="data" class="block mb-2"><?php _e('Data', 'school-admin'); ?></label>
                <input type="date" id="data" name="data" class="w-full p-2 border rounded" value="<?php echo date('Y-m-d'); ?>" required>
            </div>
            
            <div>
                <label for="voto" class="block mb-2"><?php _e('Voto (1-10)', 'school-admin'); ?></label>
                <input type="number" id="voto" name="voto" min="1" max="10" step="0.5" class="w-full p-2 border rounded" required>
            </div>
            
            <div>
                <label for="tipo" class="block mb-2"><?php _e('Tipo Valutazione', 'school-admin'); ?></label>
                <select id="tipo" name="tipo" class="w-full p-2 border rounded" required>
                    <option value="scritto"><?php _e('Scritto', 'school-admin'); ?></option>
                    <option value="orale"><?php _e('Orale', 'school-admin'); ?></option>
                    <option value="pratico"><?php _e('Pratico', 'school-admin'); ?></option>
                </select>
            </div>
            
            <div class="md:col-span-2">
                <label for="note" class="block mb-2"><?php _e('Note', 'school-admin'); ?></label>
                <textarea id="note" name="note" class="w-full p-2 border rounded" rows="3"></textarea>
            </div>
            
            <div class="md:col-span-2">
                <button type="submit" name="submit_voto" class="button">
                    <i class="fas fa-save mr-2"></i> <?php _e('Salva Voto', 'school-admin'); ?>
                </button>
            </div>
        </form>
    </div>
    
    <div class="card">
        <h2 class="text-lg font-bold mb-4"><?php _e('Ultimi Voti Registrati', 'school-admin'); ?></h2>
        
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th><?php _e('ID', 'school-admin'); ?></th>
                        <th><?php _e('Studente', 'school-admin'); ?></th>
                        <th><?php _e('Materia', 'school-admin'); ?></th>
                        <th><?php _e('Data', 'school-admin'); ?></th>
                        <th><?php _e('Voto', 'school-admin'); ?></th>
                        <th><?php _e('Tipo', 'school-admin'); ?></th>
                        <th><?php _e('Note', 'school-admin'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($voti) : ?>
                        <?php foreach ($voti as $voto) : ?>
                            <tr>
                                <td><?php echo $voto->id; ?></td>
                                <td>
                                    <a href="<?php echo get_edit_post_link($voto->studente_id); ?>" class="text-blue-600 hover:underline">
                                        <?php echo $voto->studente_nome; ?>
                                    </a>
                                </td>
                                <td><?php echo $voto->materia_nome; ?></td>
                                <td><?php echo date_i18n('d/m/Y', strtotime($voto->data)); ?></td>
                                <td>
                                    <?php 
                                    $voto_class = '';
                                    if ($voto->voto >= 8) {
                                        $voto_class = 'bg-green-100 text-green-800';
                                    } elseif ($voto->voto >= 6) {
                                        $voto_class = 'bg-blue-100 text-blue-800';
                                    } elseif ($voto->voto >= 5) {
                                        $voto_class = 'bg-yellow-100 text-yellow-800';
                                    } else {
                                        $voto_class = 'bg-red-100 text-red-800';
                                    }
                                    ?>
                                    <span class="px-3 py-1 rounded-full <?php echo $voto_class; ?>">
                                        <?php echo number_format($voto->voto, 1); ?>
                                    </span>
                                </td>
                                <td>
                                    <?php 
                                    $tipo_label = '';
                                    switch ($voto->tipo) {
                                        case 'scritto':
                                            $tipo_label = __('Scritto', 'school-admin');
                                            break;
                                        case 'orale':
                                            $tipo_label = __('Orale', 'school-admin');
                                            break;
                                        case 'pratico':
                                            $tipo_label = __('Pratico', 'school-admin');
                                            break;
                                    }
                                    echo $tipo_label;
                                    ?>
                                </td>
                                <td><?php echo $voto->note; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="7" class="text-center py-4"><?php _e('Nessun voto registrato', 'school-admin'); ?></td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
