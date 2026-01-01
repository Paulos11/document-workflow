import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context";
import { getInitials } from "../../utils";
import { ChevronDown, UserCog, Shield, FileText, RotateCcw } from "lucide-react";
import { MOCK_USERS } from "../../data";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, currentRole, switchRole, resetToDefaults } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showRoleMenu, setShowRoleMenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setShowRoleMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-neutral-surface border-b border-neutral-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-opacity focus:outline-none text-left"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-primary rounded-md flex items-center justify-center shadow-sm flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-semibold text-text-high leading-tight">Docflow</h1>
              <p className="text-caption text-text-muted leading-tight">Review & Approval Workflow</p>
            </div>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-1 rounded-md hover:bg-neutral-subtle transition-colors focus:outline-none"
            >
              <div className="w-10 h-10 bg-neutral-subtle rounded-full flex items-center justify-center text-text-high text-body-medium border border-neutral-border shadow-small">
                {getInitials(currentUser.name)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-body-medium text-text-high font-medium leading-tight">{currentUser.name}</div>
                <div className="text-caption text-text-muted leading-tight">{currentUser.role}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && !showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-surface border border-neutral-border rounded-lg shadow-large overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <div className="px-4 py-3 border-b border-neutral-border bg-neutral-subtle/30">
                  <div className="text-body-medium font-semibold text-text-high">{currentUser.name}</div>
                  <div className="text-caption text-text-muted flex items-center gap-1.5">
                    {currentRole === 'Employee' ? (
                      <UserCog className="w-3.5 h-3.5" />
                    ) : (
                      <Shield className="w-3.5 h-3.5" />
                    )}
                    {currentRole}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => setShowRoleMenu(true)}
                    className="w-full text-left px-4 py-2.5 text-body-small text-text-medium hover:bg-neutral-subtle flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <UserCog className="w-4 h-4" />
                      Switch Role
                    </span>
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>

                  <div className="my-1 border-t border-neutral-border"></div>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset all data to defaults? This will clear your localStorage.')) {
                        resetToDefaults();
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="w-full text-left px-4 py-2.5 text-body-small text-status-error hover:bg-status-error/10 flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Data
                  </button>
                </div>
              </div>
            )}

            {/* Role Selection Menu */}
            {isDropdownOpen && showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-surface border border-neutral-border rounded-lg shadow-large overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <div className="px-4 py-3 border-b border-neutral-border bg-neutral-subtle/30 flex items-center gap-2">
                  <button
                    onClick={() => setShowRoleMenu(false)}
                    className="p-1 hover:bg-neutral-subtle rounded transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <div className="text-body-medium font-semibold text-text-high">Select Role</div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      switchRole('Employee');
                      setIsDropdownOpen(false);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-body-small hover:bg-neutral-subtle flex items-center gap-2 transition-colors ${currentRole === 'Employee' ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-text-medium'
                      }`}
                  >
                    <UserCog className="w-4 h-4" />
                    <div>
                      <div className="leading-tight">Employee</div>
                      <div className="text-caption text-text-muted">Submit and track documents</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-neutral-border"></div>
                  <div className="px-4 py-2 text-caption-caps text-text-muted">Reviewers</div>

                  {MOCK_USERS.reviewers.map((reviewer) => (
                    <button
                      key={reviewer.id}
                      onClick={() => {
                        switchRole('Reviewer', reviewer);
                        setIsDropdownOpen(false);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-body-small hover:bg-neutral-subtle flex items-center gap-2 transition-colors ${currentRole === 'Reviewer' && currentUser.name === reviewer.name ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-text-medium'
                        }`}
                    >
                      <Shield className="w-4 h-4" />
                      <div>
                        <div className="leading-tight">{reviewer.name}</div>
                        <div className="text-caption text-text-muted">{reviewer.department}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
