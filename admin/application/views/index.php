<body class="dashboard dashboard_1">
    <div class="full_container">
        <div class="inner_container">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <?php 
            $this->load->view('layouts/sidebar', $data);
            ?>
        </nav>
        <!-- end sidebar -->
        <!-- right content -->
        <div id="content">
            <!-- topbar -->
            <div class="topbar">
                <?php 
                $this->load->view('layouts/topbar', $data);
            ?>
            </div>
            <!-- end topbar -->
            <!-- dashboard inner -->
            <div class="midde_cont">
                <div class="container-fluid">
                    <div class="row column_title">
                    <div class="col-md-12">
                        <div class="page_title">
                            <h2>Dashboard</h2>
                        </div>
                    </div>
                    </div>
                    <div class="row column1">
                        <div class="col-md-12">
                    
                    <?php $this->load->view($view_page,$data); ?>
                        
                        </div>

                    </div>

                
                
                    
                </div>
            </div>
            <!-- end dashboard inner -->
        </div>
        </div>
    </div>

</body>
