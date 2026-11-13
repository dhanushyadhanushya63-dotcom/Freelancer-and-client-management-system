import React from 'react';
import { X, Check, Bell, AlertTriangle, Clock, CreditCard, Sparkles, FolderPlus } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function NotificationDrawer({ isOpen, onClose, onNavigate }) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'request':
        return <FolderPlus className="w-4 h-4 text-sky-600" />;
      default:
        return <Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'overdue':
        return 'bg-rose-50 border-rose-100';
      case 'deadline':
        return 'bg-amber-50 border-amber-100';
      case 'payment':
        return 'bg-emerald-50 border-emerald-100';
      case 'request':
        return 'bg-sky-50 border-sky-100';
      default:
        return 'bg-indigo-50 border-indigo-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Notifications</h3>
                <p className="text-xs text-slate-500">
                  {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    if (notif.link && onNavigate) {
                      onNavigate(notif.link);
                      onClose();
                    }
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer relative group ${
                    notif.read ? 'bg-white border-slate-100 opacity-75' : 'bg-slate-50/70 border-slate-200'
                  } hover:shadow-sm hover:border-indigo-200`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border flex-shrink-0 ${getBg(notif.type)}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">{notif.title}</h4>
                        <span className="text-[11px] text-slate-400 whitespace-nowrap">{notif.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>

                  {!notif.read && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Notifications auto-sync with system actions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
