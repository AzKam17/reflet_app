import React from 'react';

export const refactorIcon = (
	icon,
	size = 50,
	withShadow = true,
	style = {}
) => {
	const shadows = {
		shadowColor: 'rgba(0, 0, 0, 0.25)',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
	};

	const finalStyle = withShadow ? { ...shadows, style } : style;

	return React.cloneElement(icon, {
		height: size,
		width: size,
		style: finalStyle,
	});
};
