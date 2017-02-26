var ds = ds || {};

/**
 * Upload/attach new attachment
 */
(function( $ ) {
	"use strict";
	var media;

	ds.media = media = {
		attachmentContainer: '#attachmentcontainer',

		init: function() {
			// Try to delete an attachment
			$( media.attachmentContainer ).on( 'click', '.delete-attachment', function( e ){
				e.preventDefault();
				if ( ! window.confirm( wp.media.view.l10n.warnDelete ) ) {
					return;
				}
				var this_attachment = $( this ).parent(),
					attachment_id = this_attachment.data( 'id' ),
					nonce = $( this ).data( 'nonce' );
				
				$.ajax({
					url: ajaxurl,
					data: {
						action			: 'delete_attachment',
						attachment_id 	: attachment_id,
						_ajax_nonce		: nonce
					}
				})
				.done( function( data ){
					var object = JSON.parse(data);
					
					if( object.attachment_id > 0 ) {
						// Remove attachment from view
						this_attachment.slideUp( 'fast' );
					}
				})
				.fail( function(){
					alert('Wups, something went wrong.');
				});
			});

		},

	};

	$(function () {
		var attachmentContainer = $('#attachmentcontainer');
		attachmentContainer.sortable();

		$( media.init );
	});

})( jQuery );
