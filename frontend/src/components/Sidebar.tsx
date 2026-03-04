'use client';

import {
    PlusCircle,
    MessageSquare,
    Settings,
    LogOut,
    User,
    Edit2,
    Trash2,
    Check,
    X as XIcon,
    Clock,
    Sparkles,
    Menu
} from 'lucide-react';
import { useState, useEffect } from 'react';
import UpgradeModal from './UpgradeModal';
import ProfileModal from './ProfileModal';
import { useAuth } from '@/components/AuthProvider';
import { auth, db } from '@/utils/firebase/config';
import { signOut, updateProfile, deleteUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc, collection, query, orderBy, limit, deleteDoc } from 'firebase/firestore';

export default function Sidebar({
    onChatSelect,
    onNewReading,
    activeChatId
}: {
    onChatSelect?: (chatId: string, messages: any[], loadedChartData: any) => void,
    onNewReading?: () => void,
    activeChatId?: string | null
}) {
    const [isOpen, setIsOpen] = useState(false); // Avatar dropdown state
    const [mobileOpen, setMobileOpen] = useState(false); // Mobile sidebar state
    const { user } = useAuth();
    const [questionsToday, setQuestionsToday] = useState(0);
    const [questionsLimit, setQuestionsLimit] = useState(5);
    const [userPlan, setUserPlan] = useState('FREE');
    const [planExpiry, setPlanExpiry] = useState('');
    const [recentChats, setRecentChats] = useState<any[]>([]);

    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const [showProfile, setShowProfile] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [editDisplayName, setEditDisplayName] = useState('');
    const [showTags, setShowTags] = useState(true);
    const [compactView, setCompactView] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowTags(localStorage.getItem('showChartTags') !== 'false');
            setCompactView(localStorage.getItem('compactMessageView') === 'true');
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        // Listen to User Document for Limits
        const unsub = onSnapshot(doc(db, 'users', user.uid), async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const today = new Date().toDateString();
                const lastReset = data.last_reset ? new Date(data.last_reset).toDateString() : '';

                let qToday = data.questions_today || 0;
                let qLimit = data.questions_limit || 5;
                let uPlan = data.plan || 'FREE';
                let pExpiry = data.expiry_time ? new Date(data.expiry_time).toLocaleDateString() : '';

                if (lastReset !== today) {
                    qToday = 0;
                    try {
                        await updateDoc(doc(db, 'users', user.uid), {
                            questions_today: 0,
                            last_reset: new Date().toISOString()
                        });
                    } catch (e) {
                        console.error("Failed to reset daily count", e);
                    }
                }
                setQuestionsToday(qToday);
                setQuestionsLimit(qLimit);
                setUserPlan(uPlan);
                setPlanExpiry(pExpiry);
            } else {
                try {
                    await setDoc(doc(db, 'users', user.uid), {
                        questions_today: 0,
                        last_reset: new Date().toISOString(),
                        plan: 'FREE',
                        questions_limit: 5
                    });
                    setQuestionsToday(0);
                    setQuestionsLimit(5);
                    setUserPlan('FREE');
                } catch (e) {
                    console.error("Failed to init user doc", e);
                }
            }
        });

        // Listen to Recent Chats
        const chatsRef = collection(db, 'users', user.uid, 'chats');
        const q = query(chatsRef, orderBy('updated_at', 'desc'), limit(15));
        const unsubChats = onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecentChats(chats);
        });

        return () => {
            unsub();
            unsubChats();
        };
    }, [user]);

    const handleSignOut = async () => {
        await signOut(auth);
    };

    const handleRenameChat = async (e: React.FormEvent, chatId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user || !editTitle.trim()) {
            setEditingChatId(null);
            return;
        }

        try {
            await updateDoc(doc(db, 'users', user.uid, 'chats', chatId), {
                title: editTitle.trim()
            });
            setEditingChatId(null);
        } catch (error) {
            console.error("Failed to rename chat:", error);
        }
    };

    const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation();
        if (!user) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this reading?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'users', user.uid, 'chats', chatId));
            if (activeChatId === chatId && onNewReading) {
                onNewReading(); // Reset view if deleting the currently active chat
            }
        } catch (error) {
            console.error("Failed to delete chat:", error);
        }
    };

    return (
        <>
            {/* Mobile Top Bar — full-width fixed bar replacing floating hamburger */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-12 z-50 bg-bg/95 backdrop-blur-sm border-b border-border flex items-center px-4 gap-3">
                <button
                    className="p-1.5 rounded-lg hover:bg-surface transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <Menu className="w-5 h-5 text-white" />
                </button>
                <img src="/astroword-logo.svg" alt="AstroWord" className="h-7" />
            </div>

            {/* Backdrop overlay — mobile only */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-[258px] h-[100dvh] bg-surface border-r border-border flex flex-col flex-shrink-0
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo — hidden on mobile since the top bar shows it */}
                <div className="p-4 pl-5 hidden md:block">
                    <img src="/astroword-logo.svg" alt="AstroWord" className="h-10" />
                </div>

                {/* New Chat Button */}
                <div className="px-3 mb-4 mt-2">
                    <button
                        onClick={() => {
                            if (onNewReading) onNewReading();
                            setMobileOpen(false); // Make sure to close the mobile drawer so they see the new chat
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-gold/5 hover:bg-gold/10 border border-gold/40 rounded-lg text-sm transition-all group shadow-[0_0_10px_rgba(201,168,76,0.05)]"
                    >
                        <span className="font-medium text-gold">New Chat</span>
                        <Edit2 className="w-4 h-4 text-gold" />
                    </button>

                    {/* Explore Tools Button */}
                    <button
                        onClick={() => {
                            // Using window.location to ensure full Navigation state drops if currently in chat since Sidebar lacks global router
                            if (typeof window !== 'undefined') window.location.href = '/dashboard';
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border hover:border-gold/30 hover:bg-gold/5 transition-all group mt-2"
                    >
                        <span className="text-base text-gold">✦</span>
                        <span className="text-sm font-medium text-text/70 group-hover:text-white transition-colors">
                            Explore Tools
                        </span>
                    </button>
                </div>

                {/* Limits & Plan */}
                <div className="px-3 mb-4">
                    <div className="bg-surface2 rounded-lg p-3 border border-border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-muted uppercase">Plan</span>
                            <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded uppercase font-medium">{userPlan}</span>
                        </div>
                        <div className="space-y-1.5">
                            {Math.max(0, questionsLimit - questionsToday) === 0 && !['annual', 'cosmos'].includes(userPlan.toLowerCase()) ? (
                                <div className="flex items-center gap-1 mt-1 text-xs text-red-400 font-mono">
                                    <Clock className="w-3 h-3" />
                                    <span>Resets at midnight</span>
                                </div>
                            ) : (
                                <div className="flex justify-between text-xs text-text/70 mb-1">
                                    <span>Questions left today</span>
                                    <span>{['annual', 'cosmos'].includes(userPlan.toLowerCase()) ? '∞' : `${Math.max(0, questionsLimit - questionsToday)}/${questionsLimit}`}</span>
                                </div>
                            )}
                            {(!['annual', 'cosmos'].includes(userPlan.toLowerCase())) && (
                                <div className="flex gap-1 h-1">
                                    {Array.from({ length: questionsLimit }).map((_, idx) => {
                                        const dot = idx + 1;
                                        const remaining = questionsLimit - questionsToday;
                                        const isFilled = dot <= remaining;
                                        return (
                                            <div
                                                key={dot}
                                                className={`flex-1 rounded-full ${isFilled ? 'bg-gold' : 'bg-border'}`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Chats */}
                <div className="flex-1 overflow-y-auto px-3">
                    <div className="text-xs font-mono text-muted mb-2 px-2 uppercase tracking-widest">Recent</div>
                    <div className="space-y-1 px-2 pt-1">
                        {recentChats.length === 0 ? (
                            <span className="text-xs text-muted/50 italic">No readings yet</span>
                        ) : (
                            recentChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`group relative flex items-center w-full px-2 py-1.5 rounded-md transition-colors cursor-pointer ${activeChatId === chat.id
                                        ? 'bg-gold/10 text-gold'
                                        : 'text-text/70 hover:bg-white/5 hover:text-text'
                                        }`}
                                    onClick={() => {
                                        if (editingChatId !== chat.id) {
                                            onChatSelect?.(chat.id, chat.messages || [], chat.chart_data);
                                            setMobileOpen(false); // Close mobile sidebar when chat selected
                                        }
                                    }}
                                >
                                    {editingChatId === chat.id ? (
                                        <form
                                            onSubmit={(e) => handleRenameChat(e, chat.id)}
                                            className="flex items-center w-full gap-1"
                                        >
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                autoFocus
                                                className="flex-1 bg-surface border border-gold/50 rounded px-1.5 py-0.5 text-sm text-text outline-none focus:ring-1 focus:ring-gold"
                                            />
                                            <button type="submit" className="p-1 hover:text-green-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                                <Check className="w-3 h-3" />
                                            </button>
                                            <button type="button" className="p-1 hover:text-red-400 transition-colors" onClick={(e) => { e.stopPropagation(); setEditingChatId(null); }}>
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="flex-1 truncate text-sm pr-14">
                                                {chat.title || 'Astrology Reading'}
                                            </div>

                                            <div className="absolute right-0 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity bg-gradient-to-l from-surface via-surface to-transparent pl-4 pr-1 h-full rounded-r-md">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditTitle(chat.title || 'Astrology Reading');
                                                        setEditingChatId(chat.id);
                                                    }}
                                                    className="p-1 text-muted hover:text-gold transition-colors"
                                                    title="Rename Chat"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteChat(e, chat.id)}
                                                    className="p-1 text-muted hover:text-red-400 transition-colors"
                                                    title="Delete Chat"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-3 border-t border-border mt-auto flex flex-col gap-3">

                    {/* Blog Link */}
                    <a
                        href="/blog"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted hover:text-white hover:bg-surface2 transition-all text-sm border border-transparent hover:border-border"
                    >
                        <span>📖</span>
                        <span>Astrology Blog</span>
                    </a>

                    {/* User Profile Pill */}
                    {user && (
                        <div className="relative z-50">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-surface2 rounded-lg transition-colors border border-transparent hover:border-border"
                            >
                                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-medium text-sm flex-shrink-0">
                                    {user.displayName ? user.displayName.substring(0, 1).toUpperCase() : user.email?.substring(0, 1).toUpperCase()}
                                </div>
                                <div className="flex-1 text-left truncate">
                                    <div className="text-sm font-medium">{user.displayName || 'Astrologer'}</div>
                                    <div className="text-xs text-muted truncate">{user.email}</div>
                                </div>
                            </button>

                            {/* Dropdown Menu — opens upward, above blog link */}
                            {isOpen && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0D0F1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                                    <button
                                        onClick={() => { setIsOpen(false); setEditDisplayName(user.displayName || ''); setShowProfile(true); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm text-text/80 hover:text-white"
                                    >
                                        <User className="w-4 h-4 text-muted" /> Profile
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); setEditDisplayName(user.displayName || ''); setShowSettings(true); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm text-text/80 hover:text-white"
                                    >
                                        <Settings className="w-4 h-4 text-muted" /> Settings
                                    </button>
                                    <div className="h-px bg-white/5" />
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-sm text-red-400/70 hover:text-red-400"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>{/* end sidebar div */}

            {/* ── Modals — siblings of sidebar div, not children ── */}

            <ProfileModal
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
                onUpgradeClick={() => {
                    setShowProfile(false);
                    setShowUpgradeModal(true);
                }}
            />

            {/* Settings Modal */}
            {showSettings && user && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface2 border border-border rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 p-6">
                        <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-muted hover:text-white transition-colors">
                            <XIcon className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-serif text-white mb-6">Settings</h2>

                        <div className="space-y-6">
                            {/* Account Settings */}
                            <div>
                                <h3 className="text-sm font-mono text-gold uppercase tracking-widest mb-3">Account Settings</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-muted mb-1 block">Display Name</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editDisplayName}
                                                onChange={(e) => setEditDisplayName(e.target.value)}
                                                className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
                                            />
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await updateProfile(user!, { displayName: editDisplayName });
                                                        alert("Display name updated!");
                                                    } catch (e) {
                                                        alert("Failed to update profile");
                                                    }
                                                }}
                                                className="bg-gold/20 text-gold px-3 py-2 rounded-lg text-sm hover:bg-gold/30 transition-colors"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted mb-1 block">Email</label>
                                        <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-muted">
                                            {user!.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border" />

                            {/* Preferences */}
                            <div>
                                <h3 className="text-sm font-mono text-gold uppercase tracking-widest mb-3">Preferences</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-white">Show chart tags after answers</div>
                                            <div className="text-xs text-muted">Displays the astrological placements used</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const val = !showTags;
                                                setShowTags(val);
                                                localStorage.setItem('showChartTags', String(val));
                                            }}
                                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full ${showTags ? 'bg-gold' : 'bg-surface'} border border-border transition-colors`}
                                        >
                                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${showTags ? 'translate-x-1.5' : '-translate-x-1.5'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-white">Compact message view</div>
                                            <div className="text-xs text-muted">Reduces padding in the chat flow</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const val = !compactView;
                                                setCompactView(val);
                                                localStorage.setItem('compactMessageView', String(val));
                                            }}
                                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full ${compactView ? 'bg-gold' : 'bg-surface'} border border-border transition-colors`}
                                        >
                                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${compactView ? 'translate-x-1.5' : '-translate-x-1.5'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border" />

                            {/* Danger Zone */}
                            <div>
                                <h3 className="text-sm font-mono text-red-400 uppercase tracking-widest mb-3">Danger Zone</h3>
                                <button
                                    onClick={async () => {
                                        if (window.confirm("Are you sure? This will permanently delete your account and all readings.")) {
                                            try {
                                                await deleteUser(user!);
                                            } catch (e: any) {
                                                alert("Failed to delete account. You may need to sign out and sign in again first. Error: " + e.message);
                                            }
                                        }
                                    }}
                                    className="w-full bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium flex justify-center items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
            />
        </>
    );
}
