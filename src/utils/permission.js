import _ from 'lodash';
import store from '../redux/store';

/**
 *
 * @param {*} permissionGroup permission group name of current user
 * @param {*} current current name of permission want to check
 */
export function checkPermission(permissionGroup, current) {
    const appState = store.getState();
    let authUser = appState.auth.authUser;

    if(!authUser.permissions[permissionGroup]) return false;
    if(!authUser.permissions[permissionGroup].length) return false;

    // var permissions = Object.keys(userPermissions);

    if(authUser.permissions[permissionGroup].indexOf(current) >= 0 || authUser.role_code == 'ADMIN') return true;
    else return false;
}

export function chunkGroup(permissions) {
    // group permissions
    var groups = [];
    permissions.forEach((permission, index) => {
        if (index == 0) groups.push([permission]);
        else {
            let isPushed = false;

            groups.forEach((group) => {
                if (group[0].route_name.split('.')[1] == permission.route_name.split('.')[1]) {
                    group.push(permission);
                    isPushed = true;
                }
            })
            // if not match any group
            if (!isPushed) groups.push([permission]);
        }
    });

    groups = _.chunk(groups, 3);

    return groups;
}