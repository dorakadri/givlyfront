import React from 'react';

const ImageLinkForm = ({ onFileChange, onSubmit }) => {
	return (

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div>
					<input type='file' onChange={onFileChange} style={{ display: 'none' }} id="upload-file" />
					<label htmlFor="upload-file" style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>
					Choose your ingredient
					</label>
				</div>
				<button
					onClick={onSubmit}
					style={{ marginLeft: '16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}
				>
					Detect
				</button>
			</div>
	
	)
}


export default ImageLinkForm;

