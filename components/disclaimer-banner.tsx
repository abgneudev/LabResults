export function DisclaimerBanner() {
  return (
    <div className="bg-[#002236] py-2 px-4 text-xs font-medium text-white border-t border-b border-[#03659C]/10">
      <div className="flex items-center justify-center mb-1">
        <span className="mr-1 text-base" role="img" aria-label="shield">
          🛡️
        </span>
        <span className="font-semibold text-sm">
          Secure & private. HIPAA Compliant
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="mr-1" role="img" aria-label="information">
          ℹ️
        </span>
        <span className="italic font-light text-[#E5F8FF]">
          Not a diagnosis—consult your healthcare provider.
        </span>
      </div>
    </div>
  );
}
