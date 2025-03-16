
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="mb-4">
        <a href="<?php echo home_url('/protocollo'); ?>" class="text-blue-600 hover:underline flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> Torna alla lista protocolli
        </a>
    </div>
    
    <?php if (have_posts()) : while (have_posts()) : the_post(); 
        $numero = get_post_meta(get_the_ID(), '_numero', true);
        $tipo = get_post_meta(get_the_ID(), '_tipo', true);
        $mittente = get_post_meta(get_the_ID(), '_mittente', true);
        $destinatario = get_post_meta(get_the_ID(), '_destinatario', true);
        $stato = get_post_meta(get_the_ID(), '_stato', true);
        $documento = get_post_meta(get_the_ID(), '_documento', true);
    ?>
    
    <div class="card mb-6">
        <h2 class="text-xl font-bold mb-4 flex items-center">
            <i class="fas fa-clipboard-list text-blue-500 mr-2"></i>
            Protocollo: <?php the_title(); ?>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-medium mb-2">Informazioni Protocollo</h3>
                <div class="bg-gray-50 p-4 rounded space-y-2">
                    <div class="flex justify-between">
                        <span class="font-medium">Numero:</span>
                        <span><?php echo $numero; ?></span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Data:</span>
                        <span><?php echo get_the_date('d/m/Y'); ?></span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Tipo:</span>
                        <span><?php echo $tipo == 'ingresso' ? 'Ingresso' : 'Uscita'; ?></span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Stato:</span>
                        <span>
                            <?php if ($stato == 'approvato') : ?>
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span>
                            <?php elseif ($stato == 'respinto') : ?>
                                <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Respinto</span>
                            <?php else : ?>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In attesa</span>
                            <?php endif; ?>
                        </span>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 class="font-medium mb-2">Dettagli <?php echo $tipo == 'ingresso' ? 'Mittente' : 'Destinatario'; ?></h3>
                <div class="bg-gray-50 p-4 rounded space-y-2">
                    <?php if ($tipo == 'ingresso') : ?>
                        <div class="flex justify-between">
                            <span class="font-medium">Mittente:</span>
                            <span><?php echo $mittente; ?></span>
                        </div>
                    <?php else : ?>
                        <div class="flex justify-between">
                            <span class="font-medium">Destinatario:</span>
                            <span><?php echo $destinatario; ?></span>
                        </div>
                    <?php endif; ?>
                    
                    <div class="flex justify-between">
                        <span class="font-medium">Email:</span>
                        <span><?php echo get_post_meta(get_the_ID(), '_email', true); ?></span>
                    </div>
                    
                    <div class="flex justify-between">
                        <span class="font-medium">Telefono:</span>
                        <span><?php echo get_post_meta(get_the_ID(), '_telefono', true); ?></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6">
            <h3 class="font-medium mb-2">Oggetto e Descrizione</h3>
            <div class="bg-gray-50 p-4 rounded">
                <p class="font-medium mb-2">Oggetto: <?php the_title(); ?></p>
                <div class="prose">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        
        <div class="mt-6">
            <h3 class="font-medium mb-2">Documento Allegato</h3>
            <?php if ($documento) : 
                $attachment = get_post($documento);
            ?>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div class="flex items-center">
                    <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                    <span><?php echo $attachment->post_title; ?></span>
                </div>
                <div>
                    <a href="<?php echo wp_get_attachment_url($documento); ?>" target="_blank" class="button button-outline">
                        <i class="fas fa-download mr-2"></i> Scarica
                    </a>
                </div>
            </div>
            <?php else : ?>
            <p class="text-gray-500 p-3 bg-gray-50 rounded">Nessun documento allegato</p>
            <?php endif; ?>
        </div>
        
        <?php if ($stato == 'attesa') : ?>
        <div class="mt-6 flex space-x-2">
            <button class="button">
                <i class="fas fa-check mr-2"></i> Approva
            </button>
            <button class="button button-outline">
                <i class="fas fa-times mr-2"></i> Rifiuta
            </button>
        </div>
        <?php endif; ?>
    </div>
    
    <!-- Storico modifiche -->
    <div class="card">
        <h2 class="text-lg font-bold mb-4">Storico Modifiche</h2>
        <table class="w-full">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Utente</th>
                    <th>Azione</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><?php echo get_the_date('d/m/Y H:i'); ?></td>
                    <td>Admin</td>
                    <td>Creazione</td>
                    <td>Protocollo creato</td>
                </tr>
                <?php if ($stato == 'approvato') : ?>
                <tr>
                    <td><?php echo date('d/m/Y H:i', strtotime('+1 day', strtotime(get_the_date()))); ?></td>
                    <td>Admin</td>
                    <td>Approvazione</td>
                    <td>Protocollo approvato</td>
                </tr>
                <?php elseif ($stato == 'respinto') : ?>
                <tr>
                    <td><?php echo date('d/m/Y H:i', strtotime('+1 day', strtotime(get_the_date()))); ?></td>
                    <td>Admin</td>
                    <td>Rifiuto</td>
                    <td>Protocollo rifiutato</td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    
    <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
