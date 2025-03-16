
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="mb-4">
        <a href="<?php echo home_url('/docenti'); ?>" class="text-blue-600 hover:underline flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> Torna alla lista docenti
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
                <p class="text-gray-500">Docente di <?php echo get_post_meta(get_the_ID(), '_materia', true); ?></p>
            </div>
            
            <div class="space-y-3">
                <div class="flex">
                    <div class="w-1/3 font-medium">Data di nascita:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_data_nascita', true); ?></div>
                </div>
                <div class="flex">
                    <div class="w-1/3 font-medium">Materia:</div>
                    <div class="w-2/3"><?php echo get_post_meta(get_the_ID(), '_materia', true); ?></div>
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
        
        <!-- Classi e Orario -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Classi e Orario</h2>
            
            <h3 class="font-medium mb-2">Classi assegnate</h3>
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">1A</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">2A</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">3B</span>
            </div>
            
            <h3 class="font-medium mb-2">Orario settimanale</h3>
            <div class="space-y-2">
                <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Lunedì</p>
                    <p class="text-sm">08:00-10:00 (1A), 11:00-13:00 (2A)</p>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Martedì</p>
                    <p class="text-sm">09:00-11:00 (3B)</p>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Mercoledì</p>
                    <p class="text-sm">08:00-10:00 (2A), 11:00-13:00 (1A)</p>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Giovedì</p>
                    <p class="text-sm">10:00-12:00 (3B)</p>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Venerdì</p>
                    <p class="text-sm">09:00-11:00 (1A), 11:00-13:00 (2A)</p>
                </div>
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
            <div class="tab active" data-tab="impiego">Impiego</div>
            <div class="tab" data-tab="qualifiche">Qualifiche</div>
            <div class="tab" data-tab="permessi">Permessi</div>
            <div class="tab" data-tab="comunicazioni">Comunicazioni</div>
        </div>
        
        <div id="impiego" class="tab-content">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-medium mb-2">Informazioni Contrattuali</h3>
                    <div class="space-y-2">
                        <div class="flex">
                            <div class="w-1/3 font-medium">Tipo contratto:</div>
                            <div class="w-2/3">Tempo indeterminato</div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Data assunzione:</div>
                            <div class="w-2/3">01/09/2018</div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Sede:</div>
                            <div class="w-2/3">Sede principale</div>
                        </div>
                        <div class="flex">
                            <div class="w-1/3 font-medium">Ore settimanali:</div>
                            <div class="w-2/3">18</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-medium mb-2">Progressioni di Carriera</h3>
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01/09/2021</td>
                                <td>Passaggio gradone</td>
                                <td>Secondo gradone</td>
                            </tr>
                            <tr>
                                <td>01/09/2018</td>
                                <td>Assunzione</td>
                                <td>Primo gradone</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <div id="qualifiche" class="tab-content hidden">
            <h3 class="text-lg font-medium mb-2">Titoli di Studio e Certificazioni</h3>
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Titolo</th>
                        <th>Istituzione</th>
                        <th>Anno</th>
                        <th>Punteggio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laurea</td>
                        <td>Laurea in Lettere</td>
                        <td>Università di Roma</td>
                        <td>2010</td>
                        <td>110/110</td>
                    </tr>
                    <tr>
                        <td>Master</td>
                        <td>Master in Didattica</td>
                        <td>Università di Milano</td>
                        <td>2012</td>
                        <td>Ottimo</td>
                    </tr>
                    <tr>
                        <td>Certificazione</td>
                        <td>Abilitazione all'insegnamento</td>
                        <td>MIUR</td>
                        <td>2014</td>
                        <td>78/80</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div id="permessi" class="tab-content hidden">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium">Permessi e Assenze</h3>
                <button class="button button-outline">
                    <i class="fas fa-plus mr-2"></i> Nuova Richiesta
                </button>
            </div>
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Dal</th>
                        <th>Al</th>
                        <th>Giorni</th>
                        <th>Stato</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Malattia</td>
                        <td>10/03/2024</td>
                        <td>15/03/2024</td>
                        <td>6</td>
                        <td><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span></td>
                        <td>Certificato medico presentato</td>
                    </tr>
                    <tr>
                        <td>Permesso personale</td>
                        <td>05/02/2024</td>
                        <td>05/02/2024</td>
                        <td>1</td>
                        <td><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Ferie</td>
                        <td>21/12/2023</td>
                        <td>05/01/2024</td>
                        <td>16</td>
                        <td><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span></td>
                        <td>Vacanze natalizie</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-3 rounded">
                    <h4 class="font-medium mb-1">Giorni di malattia</h4>
                    <div class="flex justify-between">
                        <span>Utilizzati: 6</span>
                        <span>Disponibili: 9</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2.5 mt-2">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 40%"></div>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                    <h4 class="font-medium mb-1">Permessi personali</h4>
                    <div class="flex justify-between">
                        <span>Utilizzati: 1</span>
                        <span>Disponibili: 2</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2.5 mt-2">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 33%"></div>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                    <h4 class="font-medium mb-1">Ferie</h4>
                    <div class="flex justify-between">
                        <span>Utilizzati: 16</span>
                        <span>Disponibili: 14</span>
                    </div>
                    <div class="bg-gray-200 rounded-full h-2.5 mt-2">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 53%"></div>
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
                        <td>15/03/2024</td>
                        <td>Email</td>
                        <td>Convocazione collegio docenti</td>
                        <td><?php echo get_post_meta(get_the_ID(), '_email', true); ?></td>
                        <td><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Inviata</span></td>
                    </tr>
                    <tr>
                        <td>02/02/2024</td>
                        <td>Notifica</td>
                        <td>Cambio orario lezioni</td>
                        <td>App</td>
                        <td><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Letta</span></td>
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
