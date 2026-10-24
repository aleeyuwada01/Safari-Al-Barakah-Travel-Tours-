import React from 'react';
import { 
  Building2, Plane, Train, Car, Compass, Luggage, 
  Users, Ship, Sparkles, Lightbulb, MapPin, Tag, Smartphone, Award
} from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenTripPlanner: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenTripPlanner
}) => {
  const menuItems = [
    { id: 'hotels', label: 'Hotels & Homes', icon: Building2 },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'trains', label: 'Trains & Rail', icon: Train },
    { id: 'cars', label: 'Cars & Airport Transfers', icon: Car },
    { id: 'visas', label: 'Visa Services & Processing', icon: Award, badge: '12 Hubs' },
    { id: 'flight_hotel', label: 'Flight + Hotel', icon: Luggage },
    { id: 'private_tours', label: 'Private Tours', icon: Compass },
    { id: 'group_tours', label: 'Group Tours', icon: Users },
    { id: 'cruises', label: 'Nile Cruises & Red Sea', icon: Ship },
    { id: 'planner', label: 'Trip.Planner', icon: Sparkles, isSpecial: true, badge: 'New', isRed: true },
    { id: 'inspiration', label: 'Travel Inspiration', icon: Lightbulb },
    { id: 'map', label: 'Destination Map', icon: MapPin },
    { id: 'deals', label: 'Deals & Vouchers', icon: Tag, badge: 'Promo' },
    { id: 'app', label: 'Mobile App', icon: Smartphone }
  ];

  return (
    <aside className="w-56 shrink-0 hidden xl:block bg-white rounded-2xl border border-slate-200 p-3 shadow-xs sticky top-20 self-start">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={onOpenTripPlanner}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-blue-700 bg-blue-50/80 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                  isActive ? 'bg-white text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
