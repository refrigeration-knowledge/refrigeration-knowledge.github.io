/**
 * Refrigeration Knowledge - Core Technical Documentation JS
 * Accessible sidebar toggling & thermodynamic Superheat / Subcooling Calculator
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const toggleBtn = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.doc-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      const isOpen = sidebar.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !sidebar.contains(e.target)) {
        sidebar.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Interactive Superheat & Subcooling Calculator
  const calcBtn = document.getElementById('calc-thermo-btn');
  const actualTempInput = document.getElementById('calc-actual-temp');
  const satTempInput = document.getElementById('calc-sat-temp');
  const modeSelect = document.getElementById('calc-mode-select');
  const resultCard = document.getElementById('calc-thermo-result');
  const resultVal = document.getElementById('calc-thermo-value');
  const resultAnalysis = document.getElementById('calc-thermo-analysis');

  if (calcBtn && actualTempInput && satTempInput && modeSelect && resultCard) {
    calcBtn.addEventListener('click', () => {
      const actual = parseFloat(actualTempInput.value);
      const sat = parseFloat(satTempInput.value);
      const mode = modeSelect.value;

      if (isNaN(actual) || isNaN(sat)) {
        alert('Please provide valid temperatures in degrees Celsius.');
        return;
      }

      resultCard.style.display = 'block';

      if (mode === 'superheat') {
        const sh = actual - sat;
        resultVal.textContent = sh.toFixed(1) + ' K (Superheat)';
        if (sh < 3.0) {
          resultAnalysis.textContent = 'LOW SUPERHEAT HAZARD: Risk of liquid floodback returning to the compressor. Liquid refrigerant does not compress and can cause mechanical valve/rod destruction.';
          resultCard.style.borderLeftColor = '#dc2626';
          resultCard.style.background = '#fef2f2';
        } else if (sh >= 3.0 && sh <= 8.0) {
          resultAnalysis.textContent = 'NORMAL OPERATING RANGE: Standard evaporator coil superheat ensuring complete vaporization before reaching the compressor suction port.';
          resultCard.style.borderLeftColor = '#10b981';
          resultCard.style.background = '#f0fdf4';
        } else {
          resultAnalysis.textContent = 'HIGH SUPERHEAT WARNING: Evaporator is starving of refrigerant or facing severe load. Inefficient heat absorption and elevated compressor motor operating temperatures.';
          resultCard.style.borderLeftColor = '#f59e0b';
          resultCard.style.background = '#fffbeb';
        }
      } else {
        // Subcooling = Saturation Temp - Actual Liquid Line Temp
        const sc = sat - actual;
        resultVal.textContent = sc.toFixed(1) + ' K (Subcooling)';
        if (sc < 2.0) {
          resultAnalysis.textContent = 'LOW SUBCOOLING WARNING: Risk of liquid flashing into vapour in the liquid line prior to reaching the expansion valve, starving the evaporator.';
          resultCard.style.borderLeftColor = '#f59e0b';
          resultCard.style.background = '#fffbeb';
        } else if (sc >= 2.0 && sc <= 7.0) {
          resultAnalysis.textContent = 'NORMAL SUBCOOLING RANGE: Confirms solid column of pure liquid entering the metering expansion device without premature flash-gas formation.';
          resultCard.style.borderLeftColor = '#10b981';
          resultCard.style.background = '#f0fdf4';
        } else {
          resultAnalysis.textContent = 'HIGH SUBCOOLING: Condenser may be overcharged or backed up with liquid, reducing effective heat rejection surface area and increasing head pressure.';
          resultCard.style.borderLeftColor = '#3b82f6';
          resultCard.style.background = '#eff6ff';
        }
      }
    });
  }
});
