// Check for browser support of the :has() selector
const supportsHas = CSS.supports('selector(:has(a))');

const commandBlocks = document.querySelectorAll('.command-block');

commandBlocks.forEach(block => {
    const pre = block.querySelector('pre');
    let mouseDownPos = null;

    pre.addEventListener('mousedown', e => {
        mouseDownPos = { x: e.clientX, y: e.clientY };
    });

    pre.addEventListener('mouseup', e => {
        const dx = e.clientX - mouseDownPos.x;
        const dy = e.clientY - mouseDownPos.y;
        
        // Only toggle if it was a click (not a drag)
        if (Math.sqrt(dx*dx + dy*dy) < 5) {
            const isFullscreen = pre.classList.contains('fullscreen');
            
            // Close any other open command blocks first
            document.querySelectorAll('.fullscreen').forEach(openPre => {
                // Find its original parent block
                const originalParent = openPre.dataset.originalParentId 
                    ? document.getElementById(openPre.dataset.originalParentId)
                    : openPre.closest('.command-block');

                openPre.classList.remove('fullscreen');
                // Move it back to its original place
                if (originalParent) {
                    originalParent.appendChild(openPre);
                }
                // Fallback: remove the no-hover class
                if (originalParent && !supportsHas) {
                    originalParent.classList.remove('no-hover');
                }
            });

            // If it wasn't already open, open it now
            if (!isFullscreen) {
                // Store the ID of the parent block so we can find it later
                pre.dataset.originalParentId = block.id || `block-${Math.random().toString(36).substr(2, 9)}`;
                if (!block.id) {
                    block.id = pre.dataset.originalParentId;
                }
                
                // Move the pre to the body to avoid clipping issues
                document.body.appendChild(pre);
                
                // Add the fullscreen class
                pre.classList.add('fullscreen');

                // Fallback: add the no-hover class to the original parent
                if (!supportsHas) {
                    block.classList.add('no-hover');
                }
            }
        }
    });

    // Add touch support for mobile devices
    pre.addEventListener('touchstart', e => {
        mouseDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    pre.addEventListener('touchend', e => {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - mouseDownPos.x;
        const dy = touch.clientY - mouseDownPos.y;
        
        if (Math.sqrt(dx*dx + dy*dy) < 10) {
            const isFullscreen = pre.classList.contains('fullscreen');
            
            // Close any other open command blocks
            document.querySelectorAll('.fullscreen').forEach(openPre => {
                const originalParent = openPre.dataset.originalParentId 
                    ? document.getElementById(openPre.dataset.originalParentId)
                    : openPre.closest('.command-block');

                openPre.classList.remove('fullscreen');
                if (originalParent) {
                    originalParent.appendChild(openPre);
                }
                if (originalParent && !supportsHas) {
                    originalParent.classList.remove('no-hover');
                }
            });
            
            // If it wasn't already open, open it now
            if (!isFullscreen) {
                pre.dataset.originalParentId = block.id || `block-${Math.random().toString(36).substr(2, 9)}`;
                if (!block.id) {
                    block.id = pre.dataset.originalParentId;
                }
                
                document.body.appendChild(pre);
                pre.classList.add('fullscreen');

                if (!supportsHas) {
                    block.classList.add('no-hover');
                }
            }
        }
    }, { passive: true });
});

// Close fullscreen with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.fullscreen').forEach(pre => {
            pre.classList.remove('fullscreen');
            
            // Find its original parent block using the stored ID
            const originalParent = pre.dataset.originalParentId 
                ? document.getElementById(pre.dataset.originalParentId)
                : null;
            
            // Move it back to its original place
            if (originalParent) {
                originalParent.appendChild(pre);
            }

            // Fallback: remove the no-hover class from its parent
            if (originalParent && !supportsHas) {
                originalParent.classList.remove('no-hover');
            }
        });
    }
});