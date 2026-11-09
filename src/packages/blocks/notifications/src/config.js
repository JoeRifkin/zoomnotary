Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.apiContentType = "application/json"
exports.endPoint = "bx_block_notifications/notifications?page=";
exports.pageNoAndCount = "&per_page=15"
exports.getDataMethod = "GET";
exports.markAsReadMethod = "PUT";
exports.deleteMethod = "DELETE";
exports.patchMethod = "PATCH"
exports.notifications = "NOTIFICATIONS";
exports.deleteText = "DELETE"
exports.okText = "OK"
exports.deleteMessage = "Notifications deleted!";
exports.markAllAsRead = "Mark all as read";
exports.markAllAsReadApiEndpointForSingle = "bx_block_notifications/notifications/mark_as_read?id=";
exports.markAllAsReadApiEndpointForAll = "bx_block_notifications/notifications/mark_as_read"
// Customizable Area End