import { db, app, analytics, ref, onValue, runTransaction } from "./config.js";

// --- Tampilkan hasil ---
// const resultRef = ref(db, "votes");
// onValue(resultRef, (snapshot) => {
//   const data = snapshot.val();
//   document.getElementById("result").textContent = JSON.stringify(data, null, 2);
// });

let selectedCandidate = 0;

function vote(candidateNumber) {
  selectedCandidate = candidateNumber;
  document.getElementById(
    "candidateName"
  ).textContent = `Kandidat ${candidateNumber}`;
  document.getElementById("voteModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("voteModal").classList.add("hidden");
}

function confirmVote() {
  // In a real application, you would send this to your backend
  console.log(`User voted for candidate ${selectedCandidate}`);
  const voteRef = ref(db, "votes/" + selectedCandidate);
  runTransaction(voteRef, (current) => {
    return (current || 0) + 1;
  });
  closeModal();
  // notif
  const audio = document.getElementById("notif");
  audio.currentTime = 0;
  audio.play();

  document.getElementById("successModal").classList.remove("hidden");
  // Disable all vote buttons after voting
  //   document.querySelectorAll('[onclick^="vote"]').forEach((btn) => {
  //     btn.disabled = true;
  //     btn.classList.remove("bg-primary-600", "hover:bg-primary-700");
  //     btn.classList.add("bg-gray-400", "cursor-not-allowed");
  //   });
  setTimeout(() => {
    closeSuccessModal();
  }, 10000);
}

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}

window.vote = vote;
window.closeModal = closeModal;
window.confirmVote = confirmVote;
window.closeSuccessModal = closeSuccessModal;
