import type { KeyboardEvent } from "react";

export function onlyNumbers(keyboardEvent: KeyboardEvent<HTMLInputElement>) {
	const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
	const isNumberKey = /\d/.test(keyboardEvent.key);
	const isAllowedKey = allowedKeys.includes(keyboardEvent.key);

	if (!isNumberKey && !isAllowedKey) {
		keyboardEvent.preventDefault();
	}
}
