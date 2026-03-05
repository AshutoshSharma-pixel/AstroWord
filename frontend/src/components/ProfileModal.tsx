import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase/config';
import { useAuth } from '@/components/AuthProvider';
import { safeApiFetch } from '@/utils/safeApi';

export default function ProfileModal({ isOpen, onClose, onUpgradeClick }: any) {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showPlanDetails, setShowPlanDetails] = useState(false);
    const [planData, setPlanData] = useState<any>(null);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        if (!isOpen) { setShowPlanDetails(false); return; }
        if (!user) return;
        const fetchPlan = async () => {
            try {
                const token = await user.getIdToken();
                // We use relative path or localhost per previous setup
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

                const data = await safeApiFetch(`${apiUrl}/api/user/plan`, {
                    headers: { Authorization: `Bearer ${token}` }
                }, {
                    success: true, plan: 'free', questions_today: 0, questions_limit: 5
                });

                if (data.success) setPlanData(data);
            } catch (e) { }
        };
        fetchPlan();
    }, [isOpen, user]);

    const plan = planData?.plan || 'free';
    const questionsToday = planData?.questions_today || 0;
    const questionsLimit = planData?.questions_limit || 5;
    const planExpiry = planData?.plan_expires_at
        ? new Date(planData.plan_expires_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : null;

    const planColor = planData?.plan_cancelled ? 'text-red-400 border-red-500/20 bg-red-500/10'
        : plan === 'free' ? 'text-white/50 border-white/10 bg-white/5'
            : plan === 'starter' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                : 'text-gold border-gold/20 bg-gold/10';

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateProfile(user!, { displayName });
            // Reload Firebase user so rest of UI (Sidebar, avatar) reflects the new name
            await user.reload();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (e) { } finally { setSaving(false); }
    };

    const handleCancel = async () => {
        if (!user) return;
        if (!confirm(`Cancel your ${plan} plan? Access continues until ${planExpiry}.`)) return;
        setCancelling(true);
        try {
            const token = await user.getIdToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/payment/cancel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ user_id: user.uid })
            });
            const data = await res.json();
            if (data.success) {
                alert('Plan cancelled. Access continues until expiry.');
                setPlanData((prev: any) => ({ ...prev, plan_cancelled: true }));
            }
        } catch (e) { alert('Error. Please try again.'); }
        finally { setCancelling(false); }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full sm:max-w-sm bg-[#0D0F1A] border border-white/10 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <h2 className="text-white font-serif text-base">
                        {showPlanDetails ? 'Plan Details' : 'Profile'}
                    </h2>
                    <button onClick={showPlanDetails ? () => setShowPlanDetails(false) : onClose}
                        className="text-white/40 hover:text-white transition-colors text-sm">
                        {showPlanDetails ? '← Back' : '✕'}
                    </button>
                </div>

                {!showPlanDetails ? (
                    /* MAIN PROFILE VIEW */
                    <div className="p-5 space-y-4">

                        {/* Avatar */}
                        <div className="flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/20 flex items-center justify-center">
                                <span className="text-gold font-serif text-2xl">
                                    {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Display Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-white/40 uppercase tracking-wider font-mono">Display Name</label>
                            <div className="flex gap-2">
                                <input
                                    value={displayName}
                                    onChange={e => setDisplayName(e.target.value)}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors"
                                />
                                <button onClick={handleSave} disabled={saving}
                                    className="bg-gold/10 border border-gold/20 text-gold text-xs px-4 rounded-xl hover:bg-gold/20 transition-all disabled:opacity-50">
                                    {saving ? '...' : saved ? '✓ Saved' : 'Save'}
                                </button>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-white/40 uppercase tracking-wider font-mono">Email</label>
                            <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white/40 text-sm">
                                {user?.email}
                            </div>
                        </div>

                        {/* Account Created */}
                        <div className="flex items-center justify-between py-2 border-t border-white/5">
                            <span className="text-xs text-white/30 font-mono">Member since</span>
                            <span className="text-xs text-white/50 font-mono">
                                {user?.metadata?.creationTime
                                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                    : 'N/A'}
                            </span>
                        </div>

                        {/* Current Plan Row */}
                        <div className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-white/30 font-mono">Plan</span>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border font-mono ${planColor}`}>
                                    {planData?.plan_cancelled ? 'CANCELLED' : plan.toUpperCase()}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowPlanDetails(true)}
                                className="text-xs text-gold/70 hover:text-gold transition-colors font-mono">
                                View Details →
                            </button>
                        </div>

                        {/* Sign Out */}
                        <button
                            onClick={() => { signOut(auth); onClose(); }}
                            className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-500/30 text-sm transition-all">
                            Sign Out
                        </button>
                    </div>

                ) : (
                    /* PLAN DETAILS VIEW */
                    <div className="p-5 space-y-4">

                        {/* Plan badge + expiry */}
                        <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold px-3 py-1.5 rounded-full border font-mono ${planColor}`}>
                                {planData?.plan_cancelled ? 'CANCELLED' : plan.toUpperCase()}
                            </span>
                            {plan !== 'free' && planExpiry && (
                                <span className="text-xs text-white/30 font-mono">
                                    {planData?.plan_cancelled ? 'Access ends ' : 'Renews '}{planExpiry}
                                </span>
                            )}
                            {plan === 'free' && (
                                <span className="text-xs text-white/30 font-mono">Free forever</span>
                            )}
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                                <p className="text-xs text-white/30 font-mono mb-1">Questions/day</p>
                                <p className="text-white text-sm font-medium">
                                    {plan === 'free' ? '5' : plan === 'starter' ? '10' : '∞'}
                                </p>
                            </div>
                            <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                                <p className="text-xs text-white/30 font-mono mb-1">Charts</p>
                                <p className="text-white text-xs font-medium">
                                    {plan === 'free' ? 'D1 + D9' : plan === 'starter' ? 'D1 + D9 + D10' : 'D1 → D60'}
                                </p>
                            </div>
                        </div>

                        {/* Usage bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-xs text-white/30 font-mono">Used today</span>
                                <span className="text-xs text-white/50 font-mono">{questionsToday} / {questionsLimit}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${questionsToday >= questionsLimit ? 'bg-red-500' : 'bg-gold'}`}
                                    style={{ width: `${Math.min((questionsToday / questionsLimit) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5">
                            {plan === 'free' && ['D1', 'D9', '5/day', 'Calculators'].map(f => (
                                <span key={f} className="text-xs bg-white/5 text-white/40 px-2 py-1 rounded-lg border border-white/10">{f}</span>
                            ))}
                            {plan === 'starter' && ['D1', 'D9', 'D10', '10/day', 'Calculators', 'Dasha'].map(f => (
                                <span key={f} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/20">{f}</span>
                            ))}
                            {(plan === 'pro' || plan === 'annual') && ['D1→D60', 'Unlimited', 'Calculators', 'Auto Chart', 'Past Life'].map(f => (
                                <span key={f} className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-lg border border-gold/20">{f}</span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-1">
                            {(plan === 'free' || plan === 'starter' || planData?.plan_cancelled) && (
                                <button onClick={onUpgradeClick}
                                    className="w-full bg-gradient-to-r from-gold to-amber text-bg font-medium py-2.5 rounded-xl text-sm hover:opacity-90 transition-all">
                                    ✦ {plan === 'free' ? 'Upgrade Plan' : planData?.plan_cancelled ? 'Resubscribe' : 'Upgrade to Pro'}
                                </button>
                            )}
                            {plan !== 'free' && !planData?.plan_cancelled && (
                                <button onClick={handleCancel} disabled={cancelling}
                                    className="w-full border border-red-500/15 text-red-400/50 hover:text-red-400 hover:border-red-500/30 py-2 rounded-xl text-xs transition-all disabled:opacity-50">
                                    {cancelling ? 'Cancelling...' : `Cancel ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
