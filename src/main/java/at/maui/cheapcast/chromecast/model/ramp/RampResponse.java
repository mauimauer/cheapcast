/*
 * Copyright 2013 Sebastian Mauer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package at.maui.cheapcast.chromecast.model.ramp;

public class RampResponse extends RampMessage {
    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public class Status {
        private int eventSequence, state;
        private String contentId, title, imageUrl;
        private double duration, volume;
        private boolean muted, timeProgress;

        private int getEventSequence() {
            return eventSequence;
        }

        private void setEventSequence(int eventSequence) {
            this.eventSequence = eventSequence;
        }

        private int getState() {
            return state;
        }

        private void setState(int state) {
            this.state = state;
        }

        private String getContentId() {
            return contentId;
        }

        private void setContentId(String contentId) {
            this.contentId = contentId;
        }

        private String getTitle() {
            return title;
        }

        private void setTitle(String title) {
            this.title = title;
        }

        private String getImageUrl() {
            return imageUrl;
        }

        private void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        private double getDuration() {
            return duration;
        }

        private void setDuration(double duration) {
            this.duration = duration;
        }

        private double getVolume() {
            return volume;
        }

        private void setVolume(double volume) {
            this.volume = volume;
        }

        private boolean isMuted() {
            return muted;
        }

        private void setMuted(boolean muted) {
            this.muted = muted;
        }

        private boolean isTimeProgress() {
            return timeProgress;
        }

        private void setTimeProgress(boolean timeProgress) {
            this.timeProgress = timeProgress;
        }
    }
}
