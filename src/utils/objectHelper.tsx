export const updateObjectInArray = (items: any, itemId: number, objPropName: any, newObjProps: any) => {
	return items.map((user: any) => {
		if (user[objPropName] === itemId) {
			return {...user, ...newObjProps}
		}
		return user
	})
}









