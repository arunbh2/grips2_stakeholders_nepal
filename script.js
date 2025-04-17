document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const profileContents = document.querySelectorAll('.profile-content');
    const strategyLinks = document.querySelectorAll('.strategy-link');
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    const content = document.getElementById('content');
    const matrixLinks = document.querySelectorAll('.stakeholder-link');
    const toggleButtons = document.querySelectorAll('.toggle-btn'); // Get all toggle buttons

    // Function to hide all profile sections
    function hideAllProfiles() {
        profileContents.forEach(content => {
            content.classList.add('hidden');
        });
    }

    // Function to hide all details sections within profiles/strategies
    function hideAllDetails() {
        const allDetails = document.querySelectorAll('.details');
        allDetails.forEach(detail => {
            detail.classList.add('hidden');
        });
        // Reset toggle button text/state if needed (optional)
        toggleButtons.forEach(btn => btn.textContent = btn.textContent.replace('Hide', 'Show')); // Basic example
    }

    // Handle clicks on category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetProfile = document.getElementById(targetId);

            hideAllProfiles(); // Hide others first
            hideAllDetails();  // Also hide details within profiles when switching category
            if (targetProfile) {
                targetProfile.classList.remove('hidden');
                // Scroll to the profiles section smoothly
                document.getElementById('stakeholder-profiles').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle clicks on strategy links within profiles
     strategyLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href'); // Get the #strategy-xxx part
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 // Optional: Highlight the strategy section briefly
                 targetElement.style.transition = 'background-color 0.5s ease';
                 targetElement.style.backgroundColor = '#e9f5ff'; // Light blue highlight
                 setTimeout(() => {
                     targetElement.style.backgroundColor = ''; // Remove highlight
                 }, 1500);
            }
        });
    });

    // Handle clicks on toggle buttons for details
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetDetails = document.getElementById(targetId);

            if (targetDetails) {
                targetDetails.classList.toggle('hidden');
                // Optional: Change button text
                if (targetDetails.classList.contains('hidden')) {
                    button.textContent = button.textContent.replace('Hide', 'Show'); // Or use specific text
                } else {
                     button.textContent = button.textContent.replace('Show', 'Hide');
                }
            }
        });
    });


    // Smooth scrolling for sidebar navigation and highlight active link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                 // Use scrollIntoView for smooth scrolling relative to the window
                 targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                 // Update active link state
                 sidebarLinks.forEach(l => l.classList.remove('active'));
                 this.classList.add('active');
            }
        });
    });

     // Basic interaction for matrix links (scrolls to profile section and shows the profile)
     matrixLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetProfileId = link.getAttribute('data-target');
            const targetProfile = document.getElementById(targetProfileId);

            if (targetProfile) {
                hideAllProfiles();
                hideAllDetails();
                targetProfile.classList.remove('hidden');
                document.getElementById('stakeholder-profiles').scrollIntoView({ behavior: 'smooth' });
            } else if (targetProfileId === 'profile-other') {
                // Handle cases like "Diesel Suppliers" which don't have a full profile section
                // Maybe scroll to the table or show a small popup/message (more complex)
                document.getElementById('stakeholder-table').scrollIntoView({ behavior: 'smooth' });
                alert('Details for this stakeholder group are primarily in the table/matrix description.');
            }
        });
    });


    // Optional: Highlight active section in sidebar on scroll
    const sections = document.querySelectorAll('#content section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust offset as needed
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});
