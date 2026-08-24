(() => {
  "use strict";

  const source = window.RAFISH_GITHUB_SOURCE;
  const workspace = document.getElementById("workspace");
  let scheduled = false;

  if (!source || !workspace) return;

  function textNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  }

  function createBanner() {
    const summary = source.summary;
    const banner = document.createElement("section");
    banner.id = "githubSourceBanner";
    banner.className = "source-truth-banner";
    banner.setAttribute("aria-label", "Stan źródła prawdy GitHub");

    banner.appendChild(textNode("div", "source-truth-mark", "GH"));

    const copy = document.createElement("div");
    copy.className = "source-truth-copy";
    copy.appendChild(textNode("span", "eyebrow", "Źródło prawdy"));
    copy.appendChild(textNode("strong", "", `GitHub · ${source.owner}`));
    copy.appendChild(textNode(
      "span",
      "",
      `Stan na ${source.generatedAtLabel} · ${summary.repositories} repozytoriów · ${summary.files} plików na gałęziach głównych`
    ));
    banner.appendChild(copy);

    const health = document.createElement("div");
    health.className = "source-truth-health";
    health.appendChild(textNode("strong", "", String(summary.openFindings)));
    health.appendChild(textNode("span", "", "ustalenia do obsługi"));
    banner.appendChild(health);

    const button = textNode("button", "button small", "Zobacz źródła");
    button.type = "button";
    button.dataset.extensionModule = "integrations";
    banner.appendChild(button);
    return banner;
  }

  function applyBanner() {
    scheduled = false;
    if (document.getElementById("githubSourceBanner")) return;
    const dashboardHead = [...workspace.querySelectorAll(".page-head")]
      .find(node => node.querySelector(".eyebrow")?.textContent.trim() === "Sytuacja operacyjna");
    dashboardHead?.insertAdjacentElement("afterend", createBanner());
  }

  function scheduleBanner() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(applyBanner);
  }

  new MutationObserver(scheduleBanner).observe(workspace, { childList: true, subtree: true });
  scheduleBanner();
})();
