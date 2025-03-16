
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="mb-4">
        <a href="<?php echo home_url('/studenti'); ?>" class="text-blue-600 hover:underline flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> Torna alla lista studenti
        </a>
    </div>
    
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Informazioni Personali -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Informazioni Personali</h2>
            
            <div class="flex flex-col items-center mb-6">
                <?php if (has_post_thumbnail()) : ?>
                    <img src="<?php the_post_thumbnail_url('thumbnail'); ?>" alt="<?php the_title(); ?>" class="rounded-full w-24 h-24 mb-2">
                <?php else : ?>
                    <div class="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mb-2">
                        <i class="fas fa-user text-gray-400 text-4xl"></i>
                    </div>
                <?php endif; ?>
                
                <h3 class="text-xl font-semibold"><?php the_title(); ?></h3>
                <p class="text-gray-500">Studente</p>
            </div>
            
            <div class="space-y-3">
                <div class="flex">
                    <div class="w-1/3 font-medium">Data di nascita:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_data_nascita', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Classe:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_classe', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Email:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_email', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Telefono:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_telefono', true); ?></div>
                </div>
            </div>
        </div>
        
        <!-- Rendimento Scolastico -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Rendimento Scolastico</h2>
            
            <div class="mb-4">
                <h3 class="font-medium mb-2">Voti recenti</h3>
                <?php
                global $wpdb;
                $table_voti = $wpdb->prefix . 'voti';
                $studente_id = get_the_ID();
                
                $voti = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT * FROM $table_voti WHERE studente_id = %d ORDER BY data DESC LIMIT 5",
                        $studente_id
                    )
                );
                
                if ($voti) : ?>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Voto</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($voti as $voto) : 
                            $materia = get_post($voto->materia_id)->post_title;
                        ?>
                        <tr>
                            <td><?php echo $materia; ?></td>
                            <td><?php echo $voto->voto; ?></td>
                            <td><?php echo date('d/m/Y', strtotime($voto->data)); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <?php else : ?>
                <p class="text-gray-500">Nessun voto registrato</p>
                <?php endif; ?>
            </div>
            
            <div>
                <h3 class="font-medium mb-2">Presenze</h3>
                <?php
                $table_presenze = $wpdb->prefix . 'presenze';
                
                $presenze = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT COUNT(*) as totale, 
                        SUM(CASE WHEN stato = 'presente' THEN 1 ELSE 0 END) as presenti,
                        SUM(CASE WHEN stato = 'assente' THEN 1 ELSE 0 END) as assenti,
                        SUM(CASE WHEN stato = 'ritardo' THEN 1 ELSE 0 END) as ritardi
                        FROM $table_presenze WHERE studente_id = %d",
                        $studente_id
                    )
                );
                
                if ($presenze && $presenze[0]->totale > 0) : 
                    $presenze = $presenze[0];
                    $percentuale_presenze = ($presenze->presenti / $presenze->totale) * 100;
                ?>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Presenze: <?php echo $presenze->presenti; ?></span>
                        <span>Assenze: <?php echo $presenze->assenti; ?></span>
                        <span>Ritardi: <?php echo $presenze->ritardi; ?></span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: <?php echo $percentuale_presenze; ?>%"></div>
                    </div>
                    <p class="text-sm text-gray-500">Percentuale presenze: <?php echo round($percentuale_presenze); ?>%</p>
                </div>
                <?php else : ?>
                <p class="text-gray-500">Nessuna presenza registrata</p>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Documenti e Note -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Documenti e Note</h2>
            
            <div class="mb-4">
                <h3 class="font-medium mb-2">Documenti</h3>
                <div class="space-y-2">
                    <?php
                    $attachments = get_posts(array(
                        'post_type' => 'attachment',
                        'posts_per_page' => -1,
                        'post_parent' => get_the_ID(),
                    ));
                    
                    if ($attachments) : 
                        foreach ($attachments as $attachment) : ?>
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div class="flex items-center">
                                <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                                <span><?php echo $attachment->post_title; ?></span>
                            </div>
                            <a href="<?php echo wp_get_attachment_url($attachment->ID); ?>" target="_blank" class="text-blue-600 hover:underline">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                        <?php endforeach;
                    else : ?>
                    <p class="text-gray-500">Nessun documento</p>
                    <?php endif; ?>
                    
                    <a href="#" class="button button-outline mt-2 inline-flex w-full justify-center">
                        <i class="fas fa-plus mr-2"></i> Carica Documento
                    </a>
                </div>
            </div>
            
            <div>
                <h3 class="font-medium mb-2">Note</h3>
                <div class="bg-gray-50 p-3 rounded">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Tabs per ulteriori informazioni -->
    <div class="card mt-6">
        <div class="tabs">
            <div class="tab active" data-tab="genitori">Genitori</div>
            <div class="tab" data-tab="curriculum">Curriculum</div>
            <div class="tab" data-tab="comunicazioni">Comunicazioni</div>
        </div>
        
        <div id="genitori" class="tab-content">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Padre -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Padre</h3>
                    <div class="space-y-2">
                        <div class="flex">
                            <div class="w-1/3 font-medium">Nome:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_padre_nome', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Cognome:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_padre_cognome', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Email:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_padre_email', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Telefono:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_padre_telefono', true); ?></div>
                        </div>
                    </div>
                </div>
                
                <!-- Madre -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Madre</h3>
                    <div class="space-y-2">
                        <div class="flex">
                            <div class="w-1/3 font-medium">Nome:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_madre_nome', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Cognome:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_madre_cognome', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Email:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_madre_email', true); ?></div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Telefono:</div>
                            <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_madre_telefono', true); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="curriculum" class="tab-content hidden">
            <h3 class="text-lg font-medium mb-2">Informazioni Accademiche</h3>
            <div class="space-y-2">
                <div class="flex">
                    <div class="w-1/3 font-medium">Data di iscrizione:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_data_iscrizione', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Scuola precedente:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_scuola_precedente', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Religione:</div>
                    <div class="w-2/3">
                        <?php 
                        $irc = get_post_meta(get_the_ID(), '_irc', true);
                        echo $irc ? 'Si avvale' : 'Non si avvale';
                        ?>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="comunicazioni" class="tab-content hidden">
            <h3 class="text-lg font-medium mb-2">Storia Comunicazioni</h3>
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Oggetto</th>
                        <th>Destinatario</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" class="text-center py-4">Nessuna comunicazione registrata</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="mt-4 flex space-x-2">
                <button class="button button-outline">
                    <i class="fas fa-envelope mr-2"></i> Nuova Email
                </button>
                <button class="button button-outline">
                    <i class="fas fa-comment mr-2"></i> Nuovo Messaggio
                </button>
            </div>
        </div>
    </div>
    
    <?php endwhile; endif; ?>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Rimuove la classe active da tutti i tab
            tabs.forEach(t => t.classList.remove('active'));
            
            // Nasconde tutti i contenuti
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Attiva il tab cliccato
            tab.classList.add('active');
            
            // Mostra il contenuto corrispondente
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
});
</script>

<?php get_footer(); ?>
