
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="admin-layout">
    <!-- Sidebar -->
    <div class="admin-sidebar">
        <div class="text-xl font-bold mb-6 p-4">
            <?php bloginfo('name'); ?>
        </div>
        
        <nav>
            <ul>
                <li class="mb-2">
                    <a href="<?php echo home_url(); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-home mr-2"></i> Dashboard
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/studenti'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-user-graduate mr-2"></i> Studenti
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/docenti'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-chalkboard-teacher mr-2"></i> Personale
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/calendario'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-calendar-alt mr-2"></i> Calendario
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/documenti'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-file-alt mr-2"></i> Documenti
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/certificati'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-certificate mr-2"></i> Certificati
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/protocollo'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-clipboard-list mr-2"></i> Protocollo
                    </a>
                </li>
                <li class="mb-2">
                    <a href="<?php echo home_url('/database'); ?>" class="block p-2 hover:bg-gray-700 rounded">
                        <i class="fas fa-database mr-2"></i> Database
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    
    <!-- Main content -->
    <div class="admin-content">
        <!-- Navbar -->
        <div class="admin-navbar">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-xl font-semibold"><?php the_title(); ?></h1>
                </div>
                <div>
                    <a href="#" class="mr-4">
                        <i class="fas fa-bell"></i>
                    </a>
                    <a href="#" class="mr-4">
                        <i class="fas fa-cog"></i>
                    </a>
                    <a href="#" class="flex items-center">
                        <span class="mr-2">Admin</span>
                        <img src="<?php echo get_template_directory_uri(); ?>/images/avatar.png" alt="Avatar" class="rounded-full w-8 h-8">
                    </a>
                </div>
            </div>
        </div>
